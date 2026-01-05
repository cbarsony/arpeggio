# Arpeggio Skills Index

Context documents for AI-assisted MIDI composition.

## Important Distinction

**The final product** = a traditional MIDI editor with AI-assistance capabilities.

**These skill documents** = internal context for how the creator thinks about music.

The notation system, music theory, and unique concepts documented here are:
- ✓ For the **AI** to understand the creator's mental model
- ✓ For the **codebase** (internal architecture, variable naming, algorithms)
- ✗ NOT necessarily exposed in the user interface
- ✗ NOT principles that end users must learn

Users will see a familiar piano roll MIDI editor. The unique theory informs *how the AI assists* — it's under the hood.

Some unique tools (like Twelve-style input) may be introduced later, but they're optional enhancements, not core UI.

---

## Core Documents

| Document | Purpose |
|----------|---------|
| [product-intent.md](product-intent.md) | Vision: AI assists MIDI composition like VS Code AI assists coding |
| [notation-system.md](notation-system.md) | **The foundational theory** — 12-note system, scales, chords, degrees |
| [musical-philosophy.md](musical-philosophy.md) | Compositional approach — uniqueness first, notes over production |

## Personas

| Document | Purpose |
|----------|---------|
| [creator-persona.md](creator-persona.md) | Musical background — violin → metal, classical appreciation |
| [developer-persona.md](developer-persona.md) | Dev philosophy — vanilla web, zero dependencies, AI-assisted |

## Reference Assets

| File | Description |
|------|-------------|
| [whiteboard-of-the-project-creator.jpg](whiteboard-of-the-project-creator.jpg) | Linear + circular 12-note representations |
| [twelve-tool-screenshot.png](twelve-tool-screenshot.png) | Screenshot of the P4 guitar scale tool |

## External Tools

- **Twelve Tool**: https://cbarsony.github.io/twelve/ — Visual scale designer for P4 guitar

## Quick Reference

### The 12-Note Axiom
All music reduces to patterns in 12 semitones. Octave is irrelevant.

### Chord Rules (5)
1. 3-4 notes only
2. Root always exists (conceptually)
3. At least 2 of {1, 3, 5}
4. 2 notes = interval, not chord
5. Max ONE extension from {2, 4, 6, 7}

### Degree Order
1 → 5 → 3 → extension (not 1 → 3 → 5)

### AI Communication
Use degrees: `{1, 3, 5}` not semitones or chord names.

---

*Start with [notation-system.md](notation-system.md) — it's the heart of the system.*
