# Target User Persona

## Primary Persona: The Sketch Composer

### Profile
- **Experience**: 5-20 years composing, hobbyist or semi-pro
- **Instruments**: Guitar/keys + DAW, possibly classical training
- **Current tools**: Modern DAWs (FL Studio, Reaper, Ableton) + general-purpose AI chat
- **Output**: Many ideas started, few finished — the "99 unreleased songs" pattern

### Goals
- Capture and try musical ideas *quickly*
- Share ideas that are hearable — not just notation on a screen
- Explore harmonic possibilities without manual theory lookup
- Stay in flow — no context-switching to text chat

### Frustrations
- "I lose the idea while I'm typing it out to ChatGPT"
- "AI gives me chord names, but I wanted to *hear* it"
- "By the time I translate AI's answer back to MIDI, I forgot why I asked"

### Behaviors
- Composes in short bursts (30-90 min sessions)
- **Evaluates ideas by listening, not by looking** — if AI writes a Bach-style bass line, the first action is *play*, not *stare at notes*
- Expects MIDI editing UX similar to modern DAWs (familiar piano roll conventions)

### Quote
> "I don't need AI to write my music. I need it to keep up with my brain — and let me *hear* the result."

### Success = 
- AI response is instantly playable — one click to hear
- Finishes a session with more ideas captured than usual
- Exports MIDI to DAW feeling like the creative work is done

---

## The "Hearing First" Principle

This persona reveals a core design constraint:

> **Every AI output must be immediately audible.**

When the user asks "write a Bach-style bass line," the expected flow is:
1. AI generates MIDI → 2. User clicks play → 3. User *hears* the result

NOT:
1. AI generates MIDI → 2. User reads the notes visually → 3. User mentally interprets

The tool exists to close the gap between *idea* and *sound*. Visual representation is secondary — playback is primary.

---

## Devices & Environments

### Platform
- **Web-based** — runs in browser, no install required
- **Desktop-optimized** — primary target is laptop/desktop with keyboard + mouse
- **Mobile**: TBD — not a priority; piano roll UX may not translate well to touch

### Offline Capability
- **Editor must work offline** — drawing, editing, arranging MIDI
- **Playback must work offline** — basic synth runs locally in browser (Web Audio API)
- **AI features require network** — acceptable tradeoff; AI is enhancement, not core function

### Implications
- Use Service Worker for offline asset caching
- Synth/audio engine = client-side only
- Graceful degradation: AI panel shows "offline" state, editor remains fully functional
