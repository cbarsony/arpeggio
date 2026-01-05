import { 
    MIDI_NOTE_MIN, 
    MIDI_NOTE_MAX, 
    NOTE_HEIGHT,
    midiToNoteName, 
    isBlackKey 
} from '../utils/constants.js';

/**
 * Piano Keys - renders the keyboard on the left side
 * Pure DOM implementation
 */
export class PianoKeys {
    constructor(container, synthesizer) {
        this.container = container;
        this.synth = synthesizer;
        this.activeKeys = new Set();
        this.keyElements = new Map();
        
        this.render();
        this.setupEvents();
    }

    render() {
        this.container.innerHTML = '';
        
        for (let note = MIDI_NOTE_MAX; note >= MIDI_NOTE_MIN; note--) {
            const keyEl = document.createElement('div');
            keyEl.className = `piano-key ${isBlackKey(note) ? 'black' : 'white'}`;
            keyEl.dataset.note = note;
            keyEl.setAttribute('role', 'button');
            keyEl.setAttribute('tabindex', '0');
            
            const noteName = midiToNoteName(note);
            keyEl.setAttribute('aria-label', `Piano key ${noteName}`);
            
            // Show note name for C notes
            if (noteName.startsWith('C') && !noteName.includes('#')) {
                keyEl.textContent = noteName;
            }
            
            this.container.appendChild(keyEl);
            this.keyElements.set(note, keyEl);
        }
    }

    setupEvents() {
        let isMouseDown = false;
        
        this.container.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('piano-key')) {
                isMouseDown = true;
                const note = parseInt(e.target.dataset.note);
                this.playNote(note);
            }
        });

        this.container.addEventListener('mouseenter', (e) => {
            if (isMouseDown && e.target.classList.contains('piano-key')) {
                const note = parseInt(e.target.dataset.note);
                this.playNote(note);
            }
        }, true);

        this.container.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains('piano-key')) {
                const note = parseInt(e.target.dataset.note);
                this.stopNote(note);
            }
        }, true);

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            this.stopAllNotes();
        });
        
        // Keyboard support
        this.container.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('piano-key') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const note = parseInt(e.target.dataset.note);
                this.playNote(note);
            }
        });
        
        this.container.addEventListener('keyup', (e) => {
            if (e.target.classList.contains('piano-key') && (e.key === 'Enter' || e.key === ' ')) {
                const note = parseInt(e.target.dataset.note);
                this.stopNote(note);
            }
        });
    }

    async playNote(note) {
        await this.synth.init();
        await this.synth.resume();
        
        this.synth.noteOn(note, 100);
        const keyEl = this.keyElements.get(note);
        if (keyEl) keyEl.classList.add('active');
        this.activeKeys.add(note);
    }

    stopNote(note) {
        this.synth.noteOff(note);
        const keyEl = this.keyElements.get(note);
        if (keyEl) keyEl.classList.remove('active');
        this.activeKeys.delete(note);
    }

    stopAllNotes() {
        for (const note of this.activeKeys) {
            this.synth.noteOff(note);
            const keyEl = this.keyElements.get(note);
            if (keyEl) keyEl.classList.remove('active');
        }
        this.activeKeys.clear();
    }

    highlightKey(note, active = true) {
        const keyEl = this.keyElements.get(note);
        if (keyEl) {
            keyEl.classList.toggle('active', active);
        }
    }

    setScrollTop(scrollTop) {
        this.container.scrollTop = scrollTop;
    }
}
