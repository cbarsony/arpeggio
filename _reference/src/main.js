import { MidiEditor } from './editor/MidiEditor.js';

/**
 * MIDI Editor - Main Entry Point
 * 
 * Pure DOM implementation - no canvas
 * All elements are accessible and can be interacted with programmatically
 * 
 * Features:
 * - Draw notes by clicking and dragging on the grid
 * - Move notes by dragging
 * - Delete notes by double-clicking or pressing Delete
 * - Select notes by clicking, multi-select with Shift
 * - Play/pause/stop with transport controls
 * - Click piano keys to preview sounds
 * - Keyboard: Space = play/pause, Delete = remove selected, Escape = deselect
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎹 MIDI Editor starting...');
    
    const editor = new MidiEditor();
    
    // Expose for debugging and AI interaction
    window.midiEditor = editor;
    
    console.log('✅ MIDI Editor ready!');
    console.log('');
    console.log('How to use:');
    console.log('• Click and drag on the grid to draw notes');
    console.log('• Drag existing notes to move them');
    console.log('• Double-click a note to delete it');
    console.log('• Press Space to play/pause');
    console.log('• Click piano keys to preview sounds');
    console.log('');
    console.log('🤖 All notes are DOM elements - accessible to AI!');
});
