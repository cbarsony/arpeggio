import {
    MIDI_NOTE_MIN,
    MIDI_NOTE_MAX,
    TOTAL_KEYS,
    NOTE_HEIGHT,
    BEAT_WIDTH,
    beatToX,
    xToBeat,
    noteToY,
    yToNote,
    snapToGrid,
    midiToNoteName,
} from '../utils/constants.js';
import { Grid } from './Grid.js';

/**
 * PianoRoll - the main note editor
 * Pure DOM implementation - no canvas
 */
export class PianoRoll {
    constructor(container, notesContainer, gridContainer, midiState, synthesizer) {
        this.container = container;  // scroll container
        this.notesContainer = notesContainer;
        this.gridContainer = gridContainer;
        this.midiState = midiState;
        this.synth = synthesizer;
        
        // Grid component
        this.grid = new Grid(gridContainer, midiState);
        
        // Settings
        this.snapValue = 1;
        
        // Note DOM elements
        this.noteElements = new Map();
        
        // Interaction state
        this.isDragging = false;
        this.dragMode = null;
        this.dragStart = null;
        this.dragNote = null;
        this.previewElement = null;
        
        this.setupSize();
        this.setupEvents();
        this.renderNotes();
        
        // Listen for state changes
        this.midiState.on('change', () => this.renderNotes());
        this.midiState.on('selectionChange', () => this.updateNoteStyles());
    }

    setupSize() {
        const { width, height } = this.grid.getSize();
        const pianoRoll = this.container.querySelector('.piano-roll') || this.container.parentElement;
        pianoRoll.style.width = `${width}px`;
        pianoRoll.style.height = `${height}px`;
    }

    setSnapValue(value) {
        this.snapValue = value;
    }

    setupEvents() {
        // Click on empty grid to create note
        this.notesContainer.addEventListener('mousedown', this.handleGridMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    getMousePosition(e) {
        const rect = this.notesContainer.getBoundingClientRect();
        return {
            x: e.clientX - rect.left + this.container.scrollLeft,
            y: e.clientY - rect.top + this.container.scrollTop,
        };
    }

    // ===== Grid mouse events (for creating notes) =====

    async handleGridMouseDown(e) {
        // Only handle direct clicks on the notes container (not on notes)
        if (e.target !== this.notesContainer) return;
        
        const pos = this.getMousePosition(e);
        const beat = snapToGrid(xToBeat(pos.x), this.snapValue);
        const pitch = yToNote(pos.y);
        
        if (pitch < MIDI_NOTE_MIN || pitch > MIDI_NOTE_MAX) return;
        if (beat < 0 || beat >= this.midiState.totalBeats) return;
        
        // Clear selection
        this.midiState.clearSelection();
        
        // Start creating note
        await this.synth.init();
        await this.synth.resume();
        
        this.isDragging = true;
        this.dragMode = 'create';
        this.dragStart = { beat, pitch, x: pos.x, y: pos.y };
        
        // Create preview element
        this.createPreviewNote(pitch, beat, this.snapValue);
        
        // Play sound
        this.synth.noteOn(pitch, 80);
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        
        const pos = this.getMousePosition(e);
        const beat = snapToGrid(xToBeat(pos.x), this.snapValue);
        const pitch = yToNote(pos.y);
        
        if (this.dragMode === 'create' && this.previewElement) {
            // Extend preview note
            const duration = Math.max(this.snapValue, beat - this.dragStart.beat);
            this.updatePreviewNote(duration);
        } else if (this.dragMode === 'move' && this.dragNote) {
            // Move the note
            const beatDelta = beat - this.dragStart.beat;
            const pitchDelta = pitch - this.dragStart.pitch;
            
            const newStart = Math.max(0, this.dragStart.noteStart + beatDelta);
            const newPitch = Math.max(MIDI_NOTE_MIN, Math.min(MIDI_NOTE_MAX, this.dragStart.notePitch + pitchDelta));
            
            this.midiState.updateNote(this.dragNote.id, {
                start: newStart,
                pitch: newPitch,
            });
        }
    }

    handleMouseUp(e) {
        if (!this.isDragging) return;
        
        if (this.dragMode === 'create' && this.previewElement) {
            const pos = this.getMousePosition(e);
            const beat = snapToGrid(xToBeat(pos.x), this.snapValue);
            const duration = Math.max(this.snapValue, beat - this.dragStart.beat);
            
            // Create the note
            this.midiState.addNote({
                pitch: this.dragStart.pitch,
                start: this.dragStart.beat,
                duration: duration,
                velocity: 100,
            });
            
            // Stop sound and remove preview
            this.synth.noteOff(this.dragStart.pitch);
            this.removePreviewNote();
        }
        
        this.isDragging = false;
        this.dragMode = null;
        this.dragNote = null;
        this.dragStart = null;
    }

    handleKeyDown(e) {
        // Delete selected notes
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (document.activeElement?.classList.contains('midi-note') || 
                this.midiState.selectedNotes.length > 0) {
                e.preventDefault();
                const selectedNotes = [...this.midiState.selectedNotes];
                selectedNotes.forEach(note => {
                    this.midiState.deleteNote(note.id);
                });
            }
        }
        
        // Escape to deselect
        if (e.key === 'Escape') {
            this.midiState.clearSelection();
        }
    }

    // ===== Note click handling =====

    handleNoteMouseDown(e, note) {
        e.stopPropagation();
        
        const pos = this.getMousePosition(e);
        const beat = snapToGrid(xToBeat(pos.x), this.snapValue);
        const pitch = yToNote(pos.y);
        
        // Select
        if (e.shiftKey) {
            this.midiState.toggleNoteSelection(note.id);
        } else {
            this.midiState.selectNote(note.id);
        }
        
        // Start moving
        this.isDragging = true;
        this.dragMode = 'move';
        this.dragNote = note;
        this.dragStart = { 
            beat, 
            pitch, 
            noteStart: note.start, 
            notePitch: note.pitch,
            x: pos.x,
            y: pos.y,
        };
    }

    handleNoteDoubleClick(e, note) {
        e.stopPropagation();
        this.midiState.deleteNote(note.id);
    }

    // ===== Preview note =====

    createPreviewNote(pitch, start, duration) {
        this.previewElement = document.createElement('div');
        this.previewElement.className = 'midi-note';
        this.previewElement.style.opacity = '0.6';
        this.previewElement.style.left = `${beatToX(start) + 1}px`;
        this.previewElement.style.top = `${noteToY(pitch) + 1}px`;
        this.previewElement.style.width = `${duration * BEAT_WIDTH - 2}px`;
        this.previewElement.textContent = midiToNoteName(pitch);
        this.previewElement.setAttribute('aria-hidden', 'true');
        this.notesContainer.appendChild(this.previewElement);
    }

    updatePreviewNote(duration) {
        if (this.previewElement) {
            this.previewElement.style.width = `${duration * BEAT_WIDTH - 2}px`;
        }
    }

    removePreviewNote() {
        if (this.previewElement) {
            this.previewElement.remove();
            this.previewElement = null;
        }
    }

    // ===== Render notes =====

    renderNotes() {
        const currentNoteIds = new Set(this.midiState.allNotes.map(n => n.id));
        
        // Remove deleted notes
        for (const [noteId, element] of this.noteElements) {
            if (!currentNoteIds.has(noteId)) {
                element.remove();
                this.noteElements.delete(noteId);
            }
        }
        
        // Create or update notes
        for (const note of this.midiState.allNotes) {
            let element = this.noteElements.get(note.id);
            
            if (!element) {
                element = this.createNoteElement(note);
                this.noteElements.set(note.id, element);
                this.notesContainer.appendChild(element);
            }
            
            this.updateNoteElement(element, note);
        }
    }

    createNoteElement(note) {
        const element = document.createElement('button');
        element.className = 'midi-note';
        element.dataset.noteId = note.id;
        
        element.addEventListener('mousedown', (e) => this.handleNoteMouseDown(e, note));
        element.addEventListener('dblclick', (e) => this.handleNoteDoubleClick(e, note));
        
        return element;
    }

    updateNoteElement(element, note) {
        const x = beatToX(note.start);
        const y = noteToY(note.pitch);
        const width = note.duration * BEAT_WIDTH;
        const isSelected = this.midiState.isSelected(note.id);
        const noteName = midiToNoteName(note.pitch);
        
        element.style.left = `${x + 1}px`;
        element.style.top = `${y + 1}px`;
        element.style.width = `${width - 2}px`;
        
        element.classList.toggle('selected', isSelected);
        element.textContent = noteName;
        element.title = `${noteName} at beat ${note.start}`;
        element.setAttribute('aria-label', `Note ${noteName} at beat ${note.start}, duration ${note.duration}`);
    }

    updateNoteStyles() {
        for (const note of this.midiState.allNotes) {
            const element = this.noteElements.get(note.id);
            if (element) {
                element.classList.toggle('selected', this.midiState.isSelected(note.id));
            }
        }
    }
}
