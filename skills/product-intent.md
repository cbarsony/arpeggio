# Product Intent

> **Tagline:** *AI that replies in music, not words.*

> **Value Proposition:** A MIDI editor where you communicate with AI in both notes and words — draw what you mean, say what you want, get music and explanation back.

> **Elevator Pitch:** Talking to AI about music is slow — you have to translate notes to text and back. Arpeggio is a MIDI editor where you draw notes, ask questions, and AI responds with playable MIDI.

---

## Vision

**A MIDI editor where AI assists composition the way VS Code's AI agent assists coding.**

The interaction model is the key insight: just as AI in VS Code understands code context, suggests completions, and responds to natural language about programming — this editor will do the same for music.

## Problem Statement

**Talking to AI about music is painfully slow.**

The current workflow:
1. Compose notes in a DAW or MIDI editor
2. Manually translate to text: "I have a C major chord, then F major, then G..."
3. Ask AI a question
4. AI responds with text: "Try adding a Dm7 before the G..."
5. Manually translate back to notes

This text-as-intermediary approach is sluggish, error-prone, and breaks creative flow. Music is not text — why force it through a text bottleneck?

**The solution: AI that speaks MIDI.**

Draw notes → Ask a question → AI responds with playable MIDI.

No translation. No friction. The conversation happens in the native language of composition.

## What This Product Is (and Isn't)

### IS: A compositional sketchpad

- **Output = MIDI only** — a musical blueprint, not a finished song
- **Basic synths for preview** — hear ideas, but sound design is out of scope
- **Planning and discovery** — explore harmony, melody, arrangement ideas
- **AI as collaborator** — ask for variations, alternatives, stylistic suggestions

### IS NOT: A production tool

- Not for mixing, mastering, or final sound
- Not for users who need polished audio to evaluate ideas
- Not competing with DAWs — complementing them

**Analogy:** This is the architectural sketch, not the finished building.

## Example Workflows

| You draw... | You ask... | AI responds with... |
|-------------|------------|---------------------|
| A chord progression | "What bass line would fit in the style of Bach?" | A walking bass MIDI pattern |
| A melodic phrase | "Write a similar phrase, but in a minor key" | Transposed/transformed MIDI |
| A verse section | "Suggest a contrasting chorus" | New MIDI with harmonic contrast |
| An ambiguous voicing | "What key is this? What are my options?" | Analysis + alternative MIDI sketches |

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

1. "Sees" the MIDI directly (like seeing code in an editor)
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

A composer who:
- Thinks in notes, not production
- Can "hear through" basic synths to imagine the final sound
- Values musical ideas over sonic polish
- Wants AI as a knowledgeable collaborator, not a magic button

## Target Outcomes

- **90% reduction in idea-to-feedback time**: From ~5 min (type → translate → paste) to ~30s (draw → ask → hear)
- **Zero translation errors**: AI sees MIDI directly, eliminating misinterpretation from text descriptions
- **3x more ideas captured per session**: Lower friction = more exploration before self-editing kicks in

## Success Metrics / KPIs

| Metric | How Measured | Target |
|--------|--------------|--------|
| Time-to-playable-response | From user submit to audio preview | < 5 seconds |
| AI response acceptance rate | User keeps/modifies/discards suggestion | > 60% keep or modify |
| Session idea density | MIDI regions created per hour | 2x baseline |
| Export rate | Sessions ending in MIDI export | > 40% |

---

*The product closes the loop: music in, music out. Text is optional context, not the medium.*
