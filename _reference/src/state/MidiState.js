import { EventEmitter } from '../utils/EventEmitter.js';
import { generateId, DEFAULT_TEMPO, DEFAULT_BARS, BEATS_PER_BAR } from '../utils/constants.js';

/**
 * Represents a single MIDI note
 */
export class Note {
    constructor({ id, pitch, start, duration, velocity = 100 }) {
        this.id = id || generateId();
        this.pitch = pitch;
        this.start = start;
        this.duration = duration;
        this.velocity = velocity;
    }

    get end() {
        return this.start + this.duration;
    }

    clone() {
        return new Note({
            pitch: this.pitch,
            start: this.start,
            duration: this.duration,
            velocity: this.velocity,
        });
    }

    toJSON() {
        return {
            id: this.id,
            pitch: this.pitch,
            start: this.start,
            duration: this.duration,
            velocity: this.velocity,
        };
    }
}

/**
 * MIDI State Manager - holds all notes and settings
 */
export class MidiState extends EventEmitter {
    constructor() {
        super();
        
        this.tempo = DEFAULT_TEMPO;
        this.bars = DEFAULT_BARS;
        this.beatsPerBar = BEATS_PER_BAR;
        
        this.notes = new Map();
        this.selectedNoteIds = new Set();
    }

    get totalBeats() {
        return this.bars * this.beatsPerBar;
    }

    get allNotes() {
        return Array.from(this.notes.values());
    }

    get selectedNotes() {
        return this.allNotes.filter(note => this.selectedNoteIds.has(note.id));
    }

    getNoteById(id) {
        return this.notes.get(id);
    }

    getNotesInRange(startBeat, endBeat) {
        return this.allNotes.filter(note => 
            note.start < endBeat && note.end > startBeat
        );
    }

    getNoteAt(beat, pitch) {
        return this.allNotes.find(note =>
            note.pitch === pitch &&
            note.start <= beat &&
            note.end > beat
        );
    }

    setTempo(tempo) {
        this.tempo = Math.max(20, Math.min(300, tempo));
        this.emit('tempoChange', this.tempo);
    }

    addNote(noteData) {
        const note = noteData instanceof Note ? noteData : new Note(noteData);
        this.notes.set(note.id, note);
        this.emit('noteAdd', note);
        this.emit('change');
        return note;
    }

    updateNote(id, updates) {
        const note = this.notes.get(id);
        if (note) {
            Object.assign(note, updates);
            this.emit('noteUpdate', note);
            this.emit('change');
        }
        return note;
    }

    deleteNote(id) {
        const note = this.notes.get(id);
        if (note) {
            this.notes.delete(id);
            this.selectedNoteIds.delete(id);
            this.emit('noteDelete', note);
            this.emit('change');
        }
        return note;
    }

    clearAllNotes() {
        this.notes.clear();
        this.selectedNoteIds.clear();
        this.emit('clear');
        this.emit('change');
    }

    selectNote(id, addToSelection = false) {
        if (!addToSelection) {
            this.selectedNoteIds.clear();
        }
        this.selectedNoteIds.add(id);
        this.emit('selectionChange', this.selectedNotes);
    }

    deselectNote(id) {
        this.selectedNoteIds.delete(id);
        this.emit('selectionChange', this.selectedNotes);
    }

    clearSelection() {
        this.selectedNoteIds.clear();
        this.emit('selectionChange', []);
    }

    toggleNoteSelection(id) {
        if (this.selectedNoteIds.has(id)) {
            this.selectedNoteIds.delete(id);
        } else {
            this.selectedNoteIds.add(id);
        }
        this.emit('selectionChange', this.selectedNotes);
    }

    isSelected(id) {
        return this.selectedNoteIds.has(id);
    }

    toJSON() {
        return {
            tempo: this.tempo,
            bars: this.bars,
            beatsPerBar: this.beatsPerBar,
            notes: this.allNotes.map(n => n.toJSON()),
        };
    }

    fromJSON(data) {
        this.tempo = data.tempo || DEFAULT_TEMPO;
        this.bars = data.bars || DEFAULT_BARS;
        this.beatsPerBar = data.beatsPerBar || BEATS_PER_BAR;
        this.notes.clear();
        (data.notes || []).forEach(noteData => {
            const note = new Note(noteData);
            this.notes.set(note.id, note);
        });
        this.selectedNoteIds.clear();
        this.emit('load');
        this.emit('change');
    }
}
