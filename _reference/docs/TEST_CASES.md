# MIDI Editor Test Cases

*Plain-English test specifications for AI-driven testing.*

---

## 1. Application Load

**Steps:**
1. Navigate to the application URL

**Expected:**
- Page title is "MIDI Editor - Prototype"
- Transport controls visible (Play, Stop, BPM, Snap)
- Piano keyboard visible on left (61 keys, C2 to C7)
- Grid area visible
- Timeline with bar numbers visible (1-16)

---

## 2. Piano Key Interaction

**Steps:**
1. Click on piano key "G4"

**Expected:**
- A sound should play (triangle wave tone)
- Key should respond visually (if applicable)

---

## 3. Note Selection

**Steps:**
1. Locate an existing note on the grid
2. Click on the note

**Expected:**
- Note turns yellow (selected state)
- Note has focus outline

---

## 4. Note Deselection

**Steps:**
1. Select a note (click on it, should turn yellow)
2. Click on empty grid area

**Expected:**
- Previously selected note returns to blue color
- No notes are selected

---

## 5. Delete Selected Note

**Steps:**
1. Click on a note to select it
2. Press Delete key

**Expected:**
- The selected note disappears from the grid
- Other notes remain unaffected

---

## 6. Playback Start

**Steps:**
1. Click the Play button

**Expected:**
- Button changes to "Pause"
- Time display starts advancing (0:00.000 → increasing)
- Red playhead line appears and moves across the grid
- Notes produce sound when playhead crosses them

---

## 7. Playback Pause

**Steps:**
1. Start playback (click Play)
2. Click Pause (same button)

**Expected:**
- Time display freezes at current position
- Playhead stops moving
- Button changes back to "Play"

---

## 8. Playback Stop

**Steps:**
1. Start playback (click Play)
2. Let it run for a moment
3. Click Stop

**Expected:**
- Time display resets to 0:00.000
- Playhead returns to start (position 0)
- Playback stops

---

## 9. Tempo Change

**Steps:**
1. Locate BPM input (should show "120")
2. Change value to 180

**Expected:**
- Value updates to 180
- During playback, notes should play faster

---

## 10. Snap Value Change

**Steps:**
1. Locate Snap dropdown (should show "1/4")
2. Change to "1/8"

**Expected:**
- Dropdown shows "1/8"
- (Grid snapping behavior affects note creation/movement)

---

## 11. Clear All Notes

**Steps:**
1. Ensure there are notes on the grid
2. Click "Clear All" button

**Expected:**
- All notes disappear from the grid
- Grid is empty

---

## 12. Note Accessibility

**Steps:**
1. Check the accessibility labels on notes

**Expected:**
- Each note has an aria-label like "Note C4 at beat 0, duration 1"
- Notes are focusable buttons

---

## 13. Piano Key Accessibility

**Steps:**
1. Check the accessibility labels on piano keys

**Expected:**
- Each key has an aria-label like "Piano key G4"
- Keys are focusable buttons
- 61 keys total (C2 through C7)

---

## 14. Multiple Note Selection (if supported)

**Steps:**
1. Click on one note to select it
2. Hold Ctrl and click another note

**Expected:**
- Both notes should be selected (yellow)
- OR only the second note is selected (single selection mode)

*Note: Document actual behavior - this tests what the current implementation does.*

---

## 15. Playhead Visibility During Scroll

**Steps:**
1. Start playback
2. Scroll the grid vertically

**Expected:**
- Red playhead line remains visible across full height
- Playhead is not clipped or cut off

---

## Test Execution Notes

When running these tests, for each case report:
- ✅ **PASS** - Behavior matches expected
- ❌ **FAIL** - Behavior differs (describe what happened)
- ⚠️ **PARTIAL** - Some expectations met, some not
- 🔍 **UNCLEAR** - Could not determine (explain why)

Include screenshots for failures or unclear results.

---

## AI Testing Technical Notes

### Browser MCP Snapshot Settings

When using the Chrome DevTools MCP server for automated testing:

| Setting | Use Case |
|---------|----------|
| `verbose: false` (default) | Quick checks - shows only semantic elements (buttons, inputs, etc.) |
| `verbose: true` | Full access - shows ALL elements including generic divs |

**Important for grid interaction:**

The grid rows are generic `<div>` elements, not semantic buttons. To create notes on the grid via AI testing:

1. Use `take_snapshot` with `verbose: true`
2. Grid rows appear as `generic` elements under `application "Note editor grid"`
3. Clicking these elements creates notes at the clicked position
4. The pitch is determined by which row, the beat by horizontal position

**Example verbose output:**
```
uid=X_169 application "Note editor grid"
  uid=X_170 generic
    uid=X_171 generic  ← Grid row (clickable)
    uid=X_172 generic  ← Grid row (clickable)
    ...
```

### Creating Notes Programmatically

If grid clicking is impractical, notes can be created via JavaScript:

```javascript
window.midiEditor.midiState.addNote({ pitch: 60, start: 0, duration: 1 });
// pitch: MIDI number (60 = C4)
// start: beat position
// duration: in beats
```
