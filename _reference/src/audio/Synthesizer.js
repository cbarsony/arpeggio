import { midiToFrequency } from '../utils/constants.js';

/**
 * Simple synthesizer using Web Audio API
 */
export class Synthesizer {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.activeNotes = new Map();
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.audioContext.destination);

        this.initialized = true;
    }

    async resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    noteOn(midiNote, velocity = 100) {
        if (!this.initialized) return;
        
        this.noteOff(midiNote);

        const frequency = midiToFrequency(midiNote);
        const normalizedVelocity = velocity / 127;

        const oscillator = this.audioContext.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.value = frequency;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2000 + (normalizedVelocity * 3000);
        filter.Q.value = 1;

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start();

        const now = this.audioContext.currentTime;
        const attackTime = 0.02;
        const targetGain = normalizedVelocity * 0.5;
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(targetGain, now + attackTime);

        this.activeNotes.set(midiNote, { oscillator, gainNode, filter });
    }

    noteOff(midiNote) {
        if (!this.initialized) return;
        
        const note = this.activeNotes.get(midiNote);
        if (note) {
            const { oscillator, gainNode } = note;
            const now = this.audioContext.currentTime;
            const releaseTime = 0.1;

            gainNode.gain.cancelScheduledValues(now);
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0, now + releaseTime);

            setTimeout(() => {
                oscillator.stop();
                oscillator.disconnect();
                gainNode.disconnect();
            }, releaseTime * 1000 + 50);

            this.activeNotes.delete(midiNote);
        }
    }

    allNotesOff() {
        for (const midiNote of this.activeNotes.keys()) {
            this.noteOff(midiNote);
        }
    }

    playPreview(midiNote, duration = 100) {
        this.noteOn(midiNote, 80);
        setTimeout(() => this.noteOff(midiNote), duration);
    }

    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
        }
    }

    get currentTime() {
        return this.audioContext ? this.audioContext.currentTime : 0;
    }
}
