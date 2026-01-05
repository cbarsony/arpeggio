/**
 * Musical constants and utility values for the MIDI editor
 * Pure DOM version - no canvas
 */

// MIDI note range (4 octaves + 1 note)
export const MIDI_NOTE_MIN = 36;  // C2
export const MIDI_NOTE_MAX = 96;  // C7
export const TOTAL_KEYS = MIDI_NOTE_MAX - MIDI_NOTE_MIN + 1;

// Note names
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Which notes are black keys
export const BLACK_KEYS = [1, 3, 6, 8, 10]; // C#, D#, F#, G#, A#

// Grid dimensions (should match CSS variables)
export const NOTE_HEIGHT = 20;
export const BEAT_WIDTH = 40;
export const BEATS_PER_BAR = 4;
export const DEFAULT_BARS = 16;
export const DEFAULT_TEMPO = 120;

/**
 * Convert MIDI note number to note name with octave
 */
export function midiToNoteName(midiNote) {
    const octave = Math.floor(midiNote / 12) - 1;
    const noteName = NOTE_NAMES[midiNote % 12];
    return `${noteName}${octave}`;
}

/**
 * Check if a MIDI note is a black key
 */
export function isBlackKey(midiNote) {
    return BLACK_KEYS.includes(midiNote % 12);
}

/**
 * Convert beat position to pixel X
 */
export function beatToX(beat) {
    return beat * BEAT_WIDTH;
}

/**
 * Convert pixel X to beat position
 */
export function xToBeat(x) {
    return x / BEAT_WIDTH;
}

/**
 * Convert MIDI note to Y position (higher notes at top)
 */
export function noteToY(midiNote) {
    return (MIDI_NOTE_MAX - midiNote) * NOTE_HEIGHT;
}

/**
 * Convert Y position to MIDI note
 */
export function yToNote(y) {
    return MIDI_NOTE_MAX - Math.floor(y / NOTE_HEIGHT);
}

/**
 * Snap beat value to grid
 */
export function snapToGrid(beat, snapValue) {
    return Math.round(beat / snapValue) * snapValue;
}

/**
 * Convert beat to time in seconds
 */
export function beatToTime(beat, tempo) {
    return (beat / tempo) * 60;
}

/**
 * Convert time to beat position
 */
export function timeToBeat(time, tempo) {
    return (time * tempo) / 60;
}

/**
 * Convert MIDI note to frequency in Hz
 */
export function midiToFrequency(midiNote) {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

/**
 * Format seconds to MM:SS.mmm
 */
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toFixed(3).padStart(6, '0')}`;
}

/**
 * Generate unique ID
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
