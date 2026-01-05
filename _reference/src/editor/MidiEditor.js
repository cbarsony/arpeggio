import { MidiState } from '../state/MidiState.js';
import { Synthesizer } from '../audio/Synthesizer.js';
import { Transport } from '../audio/Transport.js';
import { PianoKeys } from '../components/PianoKeys.js';
import { Timeline } from '../components/Timeline.js';
import { PianoRoll } from '../components/PianoRoll.js';
import { formatTime, beatToX, NOTE_HEIGHT } from '../utils/constants.js';

/**
 * Main MIDI Editor - composes all components
 */
export class MidiEditor {
    constructor() {
        // State and audio
        this.midiState = new MidiState();
        this.synth = new Synthesizer();
        this.transport = new Transport(this.midiState, this.synth);
        
        // DOM elements
        this.elements = {
            pianoKeysContainer: document.getElementById('piano-keys'),
            timelineContainer: document.getElementById('timeline'),
            pianoRollScroll: document.getElementById('piano-roll-scroll'),
            pianoRoll: document.getElementById('piano-roll'),
            gridBackground: document.getElementById('grid-background'),
            notesContainer: document.getElementById('notes-container'),
            playhead: document.getElementById('playhead'),
            btnPlay: document.getElementById('btn-play'),
            btnStop: document.getElementById('btn-stop'),
            btnClear: document.getElementById('btn-clear'),
            tempoInput: document.getElementById('tempo-input'),
            snapSelect: document.getElementById('snap-select'),
            timeDisplay: document.getElementById('time-display'),
        };
        
        // Components
        this.pianoKeys = null;
        this.timeline = null;
        this.pianoRoll = null;
        
        this.init();
    }

    init() {
        this.setupComponents();
        this.setupTransportControls();
        this.setupToolbarControls();
        this.setupScrollSync();
        
        // Scroll to middle C area
        this.scrollToNote(60);
    }

    setupComponents() {
        // Piano keys
        this.pianoKeys = new PianoKeys(
            this.elements.pianoKeysContainer,
            this.synth
        );
        
        // Timeline
        this.timeline = new Timeline(
            this.elements.timelineContainer,
            this.midiState
        );
        
        // Piano roll
        this.pianoRoll = new PianoRoll(
            this.elements.pianoRollScroll,
            this.elements.notesContainer,
            this.elements.gridBackground,
            this.midiState,
            this.synth
        );
    }

    setupTransportControls() {
        const { btnPlay, btnStop, timeDisplay, playhead } = this.elements;
        
        btnPlay.addEventListener('click', async () => {
            if (this.transport.isPlaying) {
                this.transport.pause();
                btnPlay.classList.remove('playing');
                btnPlay.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>`;
                btnPlay.setAttribute('aria-label', 'Play');
            } else {
                await this.transport.play();
                btnPlay.classList.add('playing');
                btnPlay.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <rect x="5" y="3" width="4" height="18" fill="currentColor"/>
                    <rect x="15" y="3" width="4" height="18" fill="currentColor"/>
                </svg>`;
                btnPlay.setAttribute('aria-label', 'Pause');
            }
        });
        
        btnStop.addEventListener('click', () => {
            this.transport.stop();
            btnPlay.classList.remove('playing');
            btnPlay.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
            </svg>`;
            btnPlay.setAttribute('aria-label', 'Play');
        });
        
        // Update time display and playhead
        this.transport.on('positionChange', (beat) => {
            const seconds = (beat / this.midiState.tempo) * 60;
            timeDisplay.textContent = formatTime(seconds);
            
            const x = beatToX(beat);
            playhead.style.transform = `translateX(${x}px)`;
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
                e.preventDefault();
                btnPlay.click();
            }
        });
    }

    setupToolbarControls() {
        const { tempoInput, snapSelect, btnClear } = this.elements;
        
        tempoInput.addEventListener('change', (e) => {
            const tempo = parseInt(e.target.value, 10);
            if (!isNaN(tempo)) {
                this.midiState.setTempo(tempo);
            }
        });
        
        snapSelect.addEventListener('change', (e) => {
            const snapValue = parseFloat(e.target.value);
            this.pianoRoll.setSnapValue(snapValue);
        });
        
        btnClear.addEventListener('click', () => {
            if (confirm('Clear all notes?')) {
                this.midiState.clearAllNotes();
            }
        });
    }

    setupScrollSync() {
        const scrollContainer = this.elements.pianoRollScroll;
        
        scrollContainer.addEventListener('scroll', () => {
            const { scrollLeft, scrollTop } = scrollContainer;
            
            this.pianoKeys.setScrollTop(scrollTop);
            this.timeline.setScrollLeft(scrollLeft);
        });
    }

    scrollToNote(midiNote) {
        const scrollContainer = this.elements.pianoRollScroll;
        const noteY = (96 - midiNote) * NOTE_HEIGHT;
        const containerHeight = scrollContainer.clientHeight;
        
        scrollContainer.scrollTop = noteY - containerHeight / 2;
    }
}
