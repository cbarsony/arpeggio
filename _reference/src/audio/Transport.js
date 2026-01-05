import { EventEmitter } from '../utils/EventEmitter.js';
import { beatToTime, timeToBeat } from '../utils/constants.js';

/**
 * Transport - playback control and position tracking
 */
export class Transport extends EventEmitter {
    constructor(midiState, synthesizer) {
        super();
        
        this.midiState = midiState;
        this.synth = synthesizer;
        
        this.isPlaying = false;
        this.position = 0;
        
        this.startTime = 0;
        this.startPosition = 0;
        
        this.scheduledNotes = new Map();
        this.animationFrame = null;
        
        this.lookAheadTime = 0.1;
    }

    get tempo() {
        return this.midiState.tempo;
    }

    get totalBeats() {
        return this.midiState.totalBeats;
    }

    async play() {
        if (this.isPlaying) return;
        
        await this.synth.init();
        await this.synth.resume();
        
        this.isPlaying = true;
        this.startTime = this.synth.currentTime;
        this.startPosition = this.position;
        
        this.emit('play');
        this.scheduleNotes();
        this.startUpdateLoop();
    }

    pause() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        this.synth.allNotesOff();
        this.clearScheduledNotes();
        this.stopUpdateLoop();
        
        this.emit('pause');
    }

    stop() {
        this.isPlaying = false;
        this.synth.allNotesOff();
        this.clearScheduledNotes();
        this.stopUpdateLoop();
        
        this.position = 0;
        this.emit('stop');
        this.emit('positionChange', 0);
    }

    setPosition(beat) {
        const wasPlaying = this.isPlaying;
        
        if (wasPlaying) {
            this.pause();
        }
        
        this.position = Math.max(0, Math.min(beat, this.totalBeats));
        this.emit('positionChange', this.position);
        
        if (wasPlaying) {
            this.play();
        }
    }

    getCurrentPosition() {
        if (!this.isPlaying) {
            return this.position;
        }
        
        const elapsed = this.synth.currentTime - this.startTime;
        const elapsedBeats = timeToBeat(elapsed, this.tempo);
        let currentPos = this.startPosition + elapsedBeats;
        
        if (currentPos >= this.totalBeats) {
            currentPos = 0;
            this.startTime = this.synth.currentTime;
            this.startPosition = 0;
            this.clearScheduledNotes();
            this.scheduleNotes();
        }
        
        return currentPos;
    }

    scheduleNotes() {
        if (!this.isPlaying) return;
        
        const currentTime = this.synth.currentTime;
        const currentPos = this.getCurrentPosition();
        const lookAheadBeats = timeToBeat(this.lookAheadTime, this.tempo);
        const scheduleEnd = currentPos + lookAheadBeats;
        
        for (const note of this.midiState.allNotes) {
            if (this.scheduledNotes.has(note.id)) continue;
            if (note.end <= currentPos) continue;
            if (note.start > scheduleEnd) continue;
            
            const noteStartTime = beatToTime(note.start - this.startPosition, this.tempo) + this.startTime;
            const noteEndTime = beatToTime(note.end - this.startPosition, this.tempo) + this.startTime;
            const delayMs = Math.max(0, (noteStartTime - currentTime) * 1000);
            const durationMs = (noteEndTime - noteStartTime) * 1000;
            
            const noteOnTimeout = setTimeout(() => {
                if (this.isPlaying) {
                    this.synth.noteOn(note.pitch, note.velocity);
                    
                    const noteOffTimeout = setTimeout(() => {
                        this.synth.noteOff(note.pitch);
                    }, durationMs);
                    
                    this.scheduledNotes.set(note.id + '_off', noteOffTimeout);
                }
            }, delayMs);
            
            this.scheduledNotes.set(note.id, noteOnTimeout);
        }
    }

    clearScheduledNotes() {
        for (const timeout of this.scheduledNotes.values()) {
            clearTimeout(timeout);
        }
        this.scheduledNotes.clear();
    }

    startUpdateLoop() {
        const update = () => {
            if (!this.isPlaying) return;
            
            this.position = this.getCurrentPosition();
            this.emit('positionChange', this.position);
            
            this.scheduleNotes();
            
            this.animationFrame = requestAnimationFrame(update);
        };
        
        this.animationFrame = requestAnimationFrame(update);
    }

    stopUpdateLoop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
}
