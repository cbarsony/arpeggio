# AI-Assisted MIDI Editor - Development Plan

## Vision

Create a collaborative music composition tool where an AI agent can:
- **See**: Understand the current MIDI content and musical context
- **Analyze**: Recognize patterns, motifs, phrases, and musical structures
- **Suggest**: Propose continuations, variations, and harmonizations
- **Edit**: Directly manipulate MIDI data based on natural language instructions
- **Collaborate**: Work iteratively with the human composer

---

## Key Terminology

Before diving in, let's establish musical vocabulary the AI will need to understand:

| Term | Description |
|------|-------------|
| **Motif** | Shortest musical idea (2-8 notes), the "word" of music |
| **Phrase** | Musical "sentence" (typically 2-4 bars) |
| **Pattern** | Repeating rhythmic/melodic unit |
| **Sequence** | Pattern repeated at different pitches |
| **Variation** | Modified version of existing material |
| **Voice/Track** | Independent melodic line |
| **Chord Progression** | Harmonic foundation |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Frontend)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ MIDI Editor │◄─┤ Music Model │◄─┤ AI Conversation Panel   │  │
│  │   (Piano    │  │ (Patterns,  │  │ (Chat UI, context       │  │
│  │    Roll)    │  │  Analysis)  │  │  display, suggestions)  │  │
│  └─────────────┘  └─────────────┘  └───────────┬─────────────┘  │
│         ▲                ▲                     │                │
│         │                │                     ▼                │
│  ┌──────┴────────────────┴─────────────────────────────────┐    │
│  │              Core State & Event System                  │    │
│  │         (Notes, Selection, Undo/Redo, History)          │    │
│  └──────────────────────────┬──────────────────────────────┘    │
│                             │                                   │
├─────────────────────────────┼───────────────────────────────────┤
│                             ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    AI Bridge Layer                        │  │
│  │  - Serialize MIDI to AI-readable format                   │  │
│  │  - Parse AI responses into MIDI operations                │  │
│  │  - Manage conversation context                            │  │
│  │  - Tool definitions for AI actions                        │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AI Provider (Backend/API)                   │
│                                                                 │
│  Option A: Claude API (via proxy server)                        │
│  Option B: OpenAI API (via proxy server)                        │
│  Option C: Local LLM (Ollama, LM Studio)                        │
│  Option D: WebLLM (fully in-browser, limited)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Editor Foundation

**Goal**: Solid, professional-grade MIDI editor

### 1.1 Core Editor
- [ ] Multi-track support (drums, bass, melody, etc.)
- [ ] Velocity editing (vertical bars on notes)
- [ ] Note resize handles (drag to change duration)
- [ ] Copy/paste/duplicate notes
- [ ] Undo/redo system
- [ ] Zoom in/out (both time and pitch axes)
- [ ] Scroll (smoother, keyboard navigation)

### 1.2 Musical Context Features
- [ ] Key signature selector (C major, A minor, etc.)
- [ ] Scale highlighting on grid (show "safe" notes)
- [ ] Chord detection (analyze vertical note stacks)
- [ ] Tempo changes within piece
- [ ] Loop regions

### 1.3 Data Model
- [ ] Track/Channel support
- [ ] Musical metadata (key, time signature, sections)
- [ ] Pattern/Region markers (user can label sections)
- [ ] Project save/load (JSON format)

### 1.4 Playback
- [ ] Multiple instrument sounds (GM MIDI sounds via samples or synthesis)
- [ ] Metronome
- [ ] Loop playback
- [ ] Solo/mute tracks

---

## Phase 2: Music Representation Layer

**Goal**: Bridge between raw MIDI and AI-understandable concepts

### 2.1 MIDI-to-Text Serialization

The AI needs to "see" music in a format it can reason about.

#### Structured JSON
```json
{
  "metadata": {
    "key": "C major",
    "tempo": 120,
    "timeSignature": "4/4"
  },
  "tracks": [{
    "name": "Melody",
    "patterns": [{
      "id": "pattern-1",
      "bars": [1, 2],
      "notes": [
        {"pitch": "C4", "start": "1.1", "duration": "1/8", "velocity": 100},
        {"pitch": "E4", "start": "1.1.5", "duration": "1/8", "velocity": 90}
      ]
    }]
  }]
}
```

### 2.2 Pattern Detection System

Build algorithms to identify:
- **Melodic patterns**: Repeating note sequences (transposed or exact)
- **Rhythmic patterns**: Repeating duration sequences
- **Harmonic patterns**: Chord progressions
- **Structural patterns**: Phrases, sections, call-response

```javascript
// Example pattern detection output
{
  "patterns": [
    {
      "id": "motif-1",
      "type": "melodic",
      "occurrences": [
        {"start": 0, "end": 2, "transposition": 0},
        {"start": 4, "end": 6, "transposition": 0},
        {"start": 8, "end": 10, "transposition": 2}  // Same pattern, up a step
      ],
      "description": "Rising 3-note arpeggio"
    }
  ]
}
```

### 2.3 Musical Analysis Engine

- Detect implied key/mode from notes
- Identify chord progressions
- Find melodic contour (rising, falling, arch, etc.)
- Measure rhythmic density
- Detect repetition and variation

---

## Phase 3: AI Integration Layer

**Goal**: Connect AI models to the editor with proper tool use

### 3.1 AI Provider Strategy

**Proxy Server Approach**

```
Browser ◄──► Your Server (Node.js) ◄──► Claude/OpenAI API
           (handles auth, rate limits,
            conversation history)
```

Why a server:
- API keys stay secure (not in browser)
- Rate limiting and cost control
- Conversation history management
- Can switch AI providers easily

### 3.2 AI Tool Definitions

Define tools the AI can call (function calling):

```javascript
const AI_TOOLS = [
  {
    name: "add_notes",
    description: "Add notes to the composition",
    parameters: {
      track: "string",
      notes: [{ pitch: "string", start: "number", duration: "number" }]
    }
  },
  {
    name: "delete_notes",
    description: "Delete notes by ID or region",
    parameters: {
      noteIds: ["string"],
      // OR
      region: { startBar: "number", endBar: "number", track: "string" }
    }
  },
  {
    name: "transform_pattern",
    description: "Apply transformation to a pattern",
    parameters: {
      patternId: "string",
      transformation: "transpose | invert | retrograde | augment | diminish",
      amount: "number"
    }
  },
  {
    name: "duplicate_pattern",
    description: "Copy a pattern to a new location",
    parameters: {
      patternId: "string",
      targetBar: "number",
      variation: "exact | slight | significant"
    }
  },
  {
    name: "suggest_continuation",
    description: "Generate suggestions for continuing the composition",
    parameters: {
      afterBar: "number",
      style: "similar | contrasting | development",
      length: "number"
    }
  },
  {
    name: "harmonize",
    description: "Add harmony notes to a melody",
    parameters: {
      melodyTrack: "string",
      harmonyType: "thirds | sixths | chords | counterpoint"
    }
  },
  {
    name: "analyze_selection",
    description: "Provide musical analysis of selected notes",
    parameters: {
      noteIds: ["string"]
    }
  }
]
```

### 3.3 Context Management

What to send to the AI with each request:

```javascript
const context = {
  // System prompt with musical knowledge
  systemPrompt: `You are a musical collaborator and composition assistant...`,
  
  // Current state
  composition: serializeToText(midiData),
  
  // User's labels and annotations
  userAnnotations: [
    { bars: [1, 4], label: "Main theme" },
    { bars: [5, 8], label: "Variation 1" }
  ],
  
  // Recent actions (for continuity)
  recentHistory: [
    "User drew notes in bars 1-2",
    "AI suggested continuation",
    "User modified bar 3"
  ],
  
  // Current selection (what user is focused on)
  selection: { bars: [5, 8], noteCount: 12 },
  
  // Conversation history
  messages: [...]
}
```

### 3.4 Response Handling

```javascript
async function handleAIResponse(response) {
  // 1. Parse tool calls
  for (const toolCall of response.toolCalls) {
    switch (toolCall.name) {
      case 'add_notes':
        await editor.addNotes(toolCall.parameters.notes);
        break;
      case 'suggest_continuation':
        // Show suggestions in UI, don't auto-apply
        showSuggestions(toolCall.result);
        break;
      // ... etc
    }
  }
  
  // 2. Display text response
  chatPanel.addMessage(response.text, 'assistant');
  
  // 3. Update context for next turn
  updateConversationHistory(response);
}
```

---

## Phase 4: User Interface for AI Collaboration

**Goal**: Intuitive UI for human-AI music collaboration

### 4.1 Chat Panel

```
┌─────────────────────────────────────────┐
│ AI Composer Assistant              [−]  │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ I see you've created 4 similar      │ │
│ │ patterns in bars 1-8. They share a  │ │
│ │ rising arpeggio motif but vary in   │ │
│ │ the final note. Would you like me   │ │
│ │ to:                                 │ │
│ │                                     │ │
│ │ • Continue with Pattern 5-6         │ │
│ │ • Create a contrasting B section    │ │
│ │ • Harmonize the existing melody     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ You: Yes, continue the pattern but  │ │
│ │ make it build in intensity          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Type a message...]            [Send]   │
└─────────────────────────────────────────┘
```

### 4.2 Inline Suggestions

Show AI suggestions directly on the grid:

- **Ghost notes**: Semi-transparent notes showing AI suggestion
- **Accept/Reject buttons**: On hover over suggestion
- **Multiple options**: Cycle through alternatives

### 4.3 Pattern Labels & Annotations

Let users (and AI) mark regions:

```
┌──────────────────────────────────────────────────┐
│ [Pattern A] │ [Pattern A'] │ [Pattern A''] │ ... │
├──────────────────────────────────────────────────┤
│ ████████    │ ████████     │ ████████      │     │
│   ██████    │   ██████     │   ██████      │     │
│ ████        │ ████         │ ████          │     │
└──────────────────────────────────────────────────┘
```

### 4.4 Context Panel

Show what the AI "sees":

```
┌─────────────────────────────────────┐
│ AI Context                     [?]  │
├─────────────────────────────────────┤
│ Key: C major (detected)             │
│ Tempo: 120 BPM                      │
│ Time Sig: 4/4                       │
│                                     │
│ Detected Patterns:                  │
│ • Motif A (bars 1,3,5,7)            │
│ • Rhythmic pattern (consistent)     │
│                                     │
│ Harmonic Analysis:                  │
│ • I - IV - V - I progression        │
│                                     │
│ [Refresh Analysis]                  │
└─────────────────────────────────────┘
```

---

## Phase 5: Advanced Features

### 5.1 Style Learning
- User can provide reference MIDI files
- AI learns user's compositional style
- Suggestions match personal aesthetic

### 5.2 Theory-Aware Generation
- AI understands music theory rules
- Can explain why suggestions work
- Teaches while collaborating

### 5.3 Multi-Modal Input
- Hum/sing melody via microphone → AI transcribes
- Describe desired music in words → AI generates

### 5.4 Arrangement Assistant
- Help orchestrate for multiple instruments
- Suggest chord voicings
- Create bass lines, drum patterns

---

## Technical Considerations

### Performance
- Pattern detection should be incremental (not re-analyze everything)
- AI calls should be non-blocking
- Consider Web Workers for heavy analysis

### Cost Management
- Cache AI analysis results
- Debounce requests while user is editing
- Provide token usage estimates
- Support local LLMs for cost-free experimentation

### Privacy
- Option for fully local operation
- Clear data export/delete options
- Transparent about what's sent to AI

---

## Development Phases & Timeline

### Phase 1: Editor Polish (2-3 weeks)
- Undo/redo, copy/paste
- Multi-track support
- Project save/load
- Better playback

### Phase 2: Music Analysis (2-3 weeks)
- Pattern detection algorithms
- Music serialization formats
- Analysis visualization

### Phase 3: AI Integration MVP (2-3 weeks)
- Basic chat interface
- AI connection (one provider)
- Simple tool calling (add/delete notes)
- Context serialization

### Phase 4: AI Collaboration Features (3-4 weeks)
- Inline suggestions
- Pattern labeling
- Advanced tools (harmonize, transform)
- Conversation memory

### Phase 5: Polish & Advanced (ongoing)
- Multiple AI providers
- Local LLM support
- Style learning
- Community features

*This is a living document. Update as the project evolves.*
