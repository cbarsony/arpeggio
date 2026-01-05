# AI Integration Architecture

## Overview

The AI assistant analyzes and generates MIDI directly — no text-to-notes conversion. The notation system serves as the internal representation (IR) for musical reasoning.

## The Communication Model

```
┌─────────────────────────────────────────────────────────┐
│  System Context (injected at every API call)            │
│  ┌────────────────────────────────────────────────────┐ │
│  │  notation-system.md  — musical theory/IR           │ │
│  │  product-intent.md   — response style              │ │
│  │  ai-integration.md   — I/O format                  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
│  User Input:  [MIDI data] + "What key change..."        │
│                                                         │
│  AI Output:   [MIDI data] + "The pattern suggests..."   │
└─────────────────────────────────────────────────────────┘
```

## No Fine-Tuning Required

The skills folder **is** the training — injected as system prompt context at every API call.

The model "learns" the notation system fresh each call. Benefits:
- No model training infrastructure
- Easy to iterate on the theory
- Works with any capable LLM

## Input Format

MIDI data passed to AI as structured JSON:

```json
{
  "notes": [
    { "pitch": 60, "start": 0, "duration": 480, "velocity": 100 },
    { "pitch": 64, "start": 0, "duration": 480, "velocity": 100 },
    { "pitch": 67, "start": 0, "duration": 480, "velocity": 100 }
  ],
  "tempo": 120,
  "timeSignature": [4, 4],
  "question": "What key change would have the biggest impact?"
}
```

## Output Format

AI responds with MIDI data + explanation:

```json
{
  "notes": [
    { "pitch": 60, "start": 0, "duration": 480, "velocity": 100 },
    { "pitch": 63, "start": 0, "duration": 480, "velocity": 100 },
    { "pitch": 67, "start": 0, "duration": 480, "velocity": 100 }
  ],
  "explanation": "Shifting the 3rd down by one semitone changes the mode from bright to dark. This is the minimal change with maximum emotional impact.",
  "analysis": {
    "before": { "degrees": [1, 3, 5], "thirdInterval": 4 },
    "after": { "degrees": [1, 3, 5], "thirdInterval": 3 }
  }
}
```

### Output Fields

| Field | Purpose | Visibility |
|-------|---------|------------|
| `notes` | MIDI to play/display | User hears this |
| `explanation` | Human-readable insight | User reads this |
| `analysis` | Degree-based breakdown | Optional, for debugging/advanced users |

## Why Simpler Theory = Better Answers

| Classical Notation | Notation System |
|--------------------|-----------------|
| "Cmaj7#11" | `{1, 3, 5, 4}` root C |
| Ambiguous names | Unambiguous degree sets |
| Many synonyms | One representation per concept |
| Context-dependent | Self-contained |

AI models excel with:
- **Unambiguous representations** — no conflicting names
- **Consistent terminology** — no synonyms
- **Mathematical structure** — mod 12, mod 7, sets
- **Constrained DSL** — fewer ways to say the same thing

The notation system is a **DSL for music**. LLMs perform well on DSLs because they're regular and bounded.

## System Prompt Structure

```markdown
You are a music composition assistant for a MIDI editor.

## Your Internal Theory
[contents of notation-system.md]

## How to Respond
- Analyze MIDI using degree notation internally
- Respond with MIDI data (JSON format)
- Add brief natural language explanation
- Never use traditional chord names in explanations (e.g., "Cmaj7")
- Refer to intervals by semitones or degrees

## Response Format
[JSON schema for output]
```

## User Experience

1. User draws MIDI on piano roll
2. User asks natural language question
3. AI receives: MIDI data + question + system context
4. AI responds: MIDI data + explanation
5. User hears the result immediately
6. User reads optional explanation

**User never needs to:**
- Know the notation system
- Describe notes in text
- Understand degree notation
- Parse traditional chord names

## Future Considerations

| Feature | Status |
|---------|--------|
| MIDI as image (visual input) | Possible with multimodal models |
| Streaming MIDI generation | Depends on API capabilities |
| Audio preview in response | Frontend feature, not AI |
| User preference learning | Could store in conversation history |

---

*The notation system is invisible to users but essential for AI reasoning. It's the compiler between human intent and musical output.*
