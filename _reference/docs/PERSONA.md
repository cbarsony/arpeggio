# Target Persona: The Composer

## Who I Am

- Classical music background (violin, music school, sheet music literacy)
- Thinks in notes, harmonies, counterpoint - not frequencies, EQ, compression
- Values musical content over production quality
- Finds joy in a Bach MIDI played through cheap synths - the genius shines through regardless

## My Composition Background

- 20-30 years of hobbyist music creation
- Hundreds of "half-finished" pieces over the years
- Journey: Fast Tracker 2 → Mad Tracker → FL Studio → Reaper
- Not a "composer" by title, but experienced at putting things together to sound good
- Style-neutral: interested in all musical styles, not just classical
- One "official" 4-track demo released on YouTube - the rest lives on hard drives

## What I Want To Do

- Compose music the "old way" - notes on a grid instead of pen on paper
- Have AI as a **composition partner**, not a production assistant
- Discuss music theory: "What if I modulate to the relative minor here?"
- Delegate to AI: "Write a walking bass line in Baroque style for these 8 bars"
- Show my work easily: "Check those notes I wrote"
- Explore together: "What harmonies would work here? What key change would be interesting?"

## What I Explicitly Don't Care About

- How instruments sound (basic synth is fine)
- Mixing, mastering, effects
- DAW-like features (automation, plugins, VSTs)
- "Modern" music production workflows
- Making it sound "professional"

## Output & Sharing

- **MIDI is the final product** - not audio, not a polished mix
- Export/copy MIDI for use in other DAWs or physical devices
- Sharing with others who value this composition-focused approach
- Accepting that this excludes users who prioritize sound design or modern synths
- Sheet music export: nice-to-have, not essential

## Complexity Expectations

- Support for multiple instruments/voices (up to ~16)
- Think: sketching arrangements, not just simple melodies
- Counterpoint, harmony, multiple parts playing together

## Core Interaction Model

The tool should make it trivially easy to:

1. **Show** AI what I've written ("here are my notes")
2. **Ask** AI about the music ("what's happening harmonically?")
3. **Request** AI contributions ("add a countermelody in the style of Bach")
4. **Iterate** together ("make it more chromatic", "try a different cadence")

## AI Collaboration Style

Like VS Code's AI agent:

- **Wait to be asked** - don't interrupt or proactively suggest
- **Capable of managing many things** - when asked, can make substantial changes
- **Conversational** - natural dialogue, not command-response
- **Learning together** - both parties can learn from the interaction
- **Context-aware** - understands what I'm working on without constant explanation

The same feeling as chatting with an AI assistant: we discuss, we explore ideas, we make decisions together. The AI is a collaborator, not a tool with buttons.

### Note on AI Model Quality

*Development started: January 2026, using Claude Opus 4.5*

Model version matters significantly for this workflow. The experience described above requires a capable model. Observations:

| Earlier Models | Claude Opus 4.5 |
|----------------|-----------------|
| Verbose, unnecessary explanations | Concise, to the point |
| Caveats and pleasantries | Just does the work |
| Repeats back your question | Assumes context |
| Over-explains simple things | Calibrates to expertise |
| Generic advice | Context-aware responses |

This is a **capability threshold** being crossed. Earlier models could *sort of* do collaborative work, but with enough friction to be annoying. Opus 4.5 crosses into "actually useful collaborator" territory - a qualitative shift, not just incremental improvement.

If trying to replicate this workflow with a different model, results may vary. The "AI as composition partner" vision depends on this level of capability.

## Usage Story: The Acoustic Scale Opening

*A real example of the workflow this tool should enable.*

I composed a song that opens with 4 notes. These notes were deliberately chosen to **not fit a diatonic scale**: minor 2nd up, major 2nd up, minor 2nd up. This interval pattern is impossible in diatonic scales (where the two minor 2nds are spread apart). I was using the **acoustic scale** - close to diatonic, but with a unique tension.

My intention: create a subconscious unease in the listener. They can't explicitly recognize the scale violation, but they *feel* something strange. A tension, a confusion, an awareness that something unusual is happening.

**What I want from this tool:**

1. Draw those 4 notes quickly
2. Ask: *"What do you find unique in these notes?"*
3. AI recognizes (or helps me articulate): *"You're using the acoustic scale - the interval pattern m2-M2-m2 can't exist in diatonic scales. This creates a subtle tension."*

**More examples of "musical tricks" I do:**

- Start a melody implying one bass note, then have the bass enter on a *different* note - suddenly recontextualizing everything
- Use harmonic ambiguity to delay resolution
- Set up expectations, then subvert them

**The current friction:**

Today I do this by pasting notes into AI chat windows and manually explaining context. It works, but it's clunky. This tool should make that conversation **trivial to start**.

## Tool Frustrations

Currently using Reaper's MIDI editor, but:
- Too complex and confusing
- Too many configuration options I don't want to explore
- I want **simple, clear functions** - not infinite flexibility
- The tool should get out of my way, not require study
- No built-in way to discuss music with AI

## Why This Matters

This persona definition serves as a filter for every feature decision:

| Question | Check Persona | Answer |
|----------|---------------|--------|
| "Should I add reverb controls?" | Not about notes/harmony | No |
| "Should I add chord analysis?" | Helps understand harmony | Yes |
| "Should I add a mixer?" | Production, not composition | No |
| "Should I add voice leading hints?" | Composition theory | Yes |

## Development Philosophy

As the developer *and* the user, I have a unique advantage: direct access to the most honest feedback loop. But this requires:

- **Using the tool for real composition** - not just quick testing
- **Clicking 1000 times** - embracing friction to discover what's missing
- **Creating real pieces** - not just verifying features work
- **Being a power user** - treating this as my daily tool, not a side project

The insights that matter only emerge from genuine creative work.

---

## Meta: Why This Document Exists

### The Problem with Personas in Industry

In most companies, persona design fails:

1. UX team creates personas based on market research
2. Personas are presented in a meeting, everyone nods
3. Development starts
4. Nobody references the personas again
5. Features are built based on stakeholder requests, not user needs

**Why this happens:**
- Personas are abstract ("Sarah, 34, marketing manager, likes efficiency")
- No one on the dev team *is* Sarah or knows Sarah
- Stakeholders have louder voices than imaginary users
- Deadlines pressure "just ship it" over "does Sarah need this?"

### What Makes This Project Different

| Typical Project | This Project |
|-----------------|--------------|
| Persona is imaginary | Persona is me |
| Research is secondhand | Experience is firsthand |
| "Would Sarah want this?" (guess) | "Do I want this?" (know) |
| Persona doc gathers dust | Persona doc is my mirror |

There is **zero abstraction layer** between developer and user. This is rare and powerful.

### The Real Purpose of Persona Design

Good personas answer one question: **"Who are we saying no to?"**

Every feature decision is a tradeoff. Without a persona:
- "Add a mixer!" → maybe?
- "Add reverb!" → could be useful?
- "Add VST support!" → some users want it...

With a clear persona:
- "Add a mixer!" → No, persona doesn't care about mixing
- "Add scale analysis!" → Yes, persona wants harmonic conversations

**Personas are decision filters, not demographic descriptions.**

### Why Companies Undervalue This

1. **Hard to measure** - You can't A/B test "we had a clear persona"
2. **Feels like delay** - "We could be coding instead of writing documents"
3. **Requires saying no** - Stakeholders hate hearing "that's not for our user"
4. **Abstract until it's not** - The value only shows up months later when the product is coherent

### Who This Document Is For

This document isn't really for me - I already know who I am. It's for:

- **Future me** - When I forget why I made a decision
- **Potential collaborators** - Who need to understand the vision quickly
- **The AI assistant** - Who can reference it during development conversations
