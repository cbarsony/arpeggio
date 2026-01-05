# Product Intent

## Vision

**A MIDI editor where AI assists composition the way VS Code's AI agent assists coding.**

The interaction model is the key insight: just as AI in VS Code understands code context, suggests completions, and responds to natural language about programming — this editor will do the same for music.

## Problem Statement

*To be defined — pending musical philosophy context*

## Core Analogy

| VS Code + AI | Arpeggio + AI |
|--------------|---------------|
| Understands code structure | Understands musical structure |
| Context-aware suggestions | Musically-aware suggestions |
| Natural language → code | Natural language → MIDI |
| Respects coding conventions | Respects compositional intent |

## The Interaction Model

### User's Experience

1. **Draw MIDI** on the piano roll (no text needed to describe notes)
2. **Ask natural language questions**: "What key change would have the biggest impact?"
3. **Hear AI's response** as playable MIDI
4. **Read brief explanation** (optional)

### What the AI Does (Invisible)

1. "Sees" the MIDI visually (like seeing code)
2. Analyzes using the **notation system** as internal representation:
   - Identifies scale, mode, degrees
   - Detects chord progressions, voice leading
   - Finds patterns, exceptions, potential directions
3. Generates MIDI response (not just text)
4. Explains in natural language (minimal theory jargon)

### The Notation System as IR

The [notation-system.md](notation-system.md) acts as **Intermediate Representation**:

```
User (visual)  →  AI (internal analysis)  →  User (audible)
   MIDI              12-note/degree             MIDI
   drawing           based reasoning            playback
```

- User never sees `{1, 3, 5}` or degree notation
- AI uses it internally for precise, unambiguous musical reasoning
- Like AST for code: invisible but essential

### Why This Matters

- **No forced verbalization**: User doesn't translate musical ideas to text
- **Direct feedback**: AI responds with sound, not notation
- **Clean foundation**: The theory gives AI a consistent "thinking language"
- **Accessible**: User doesn't need to learn the theory

## Target User

A classically-trained musician who composes metal music using computers, valuing sound and craftsmanship over genre conventions.

---

*Next: Musical philosophy — the unique mindset that will shape how AI understands and assists.*
