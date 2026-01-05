import {
    MIDI_NOTE_MIN,
    MIDI_NOTE_MAX,
    TOTAL_KEYS,
    NOTE_HEIGHT,
    BEAT_WIDTH,
    BEATS_PER_BAR,
    isBlackKey,
    noteToY,
} from '../utils/constants.js';

/**
 * Grid - renders the background grid (rows and columns)
 * Pure DOM implementation using CSS
 */
export class Grid {
    constructor(container, midiState) {
        this.container = container;
        this.midiState = midiState;
        
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        
        const totalBeats = this.midiState.totalBeats;
        
        // Create row backgrounds
        for (let note = MIDI_NOTE_MAX; note >= MIDI_NOTE_MIN; note--) {
            const rowEl = document.createElement('div');
            rowEl.className = `grid-row ${isBlackKey(note) ? 'black-key' : 'white-key'}`;
            rowEl.style.top = `${noteToY(note)}px`;
            this.container.appendChild(rowEl);
        }
        
        // Create vertical grid lines
        for (let beat = 0; beat <= totalBeats; beat++) {
            const lineEl = document.createElement('div');
            const isBar = beat % BEATS_PER_BAR === 0;
            lineEl.className = `grid-line ${isBar ? 'bar' : 'beat'}`;
            lineEl.style.left = `${beat * BEAT_WIDTH}px`;
            this.container.appendChild(lineEl);
        }
    }
    
    getSize() {
        return {
            width: this.midiState.totalBeats * BEAT_WIDTH,
            height: TOTAL_KEYS * NOTE_HEIGHT,
        };
    }
}
