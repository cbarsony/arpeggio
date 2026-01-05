# Notation System

## The Core Axiom

> **Think only in 12 notes.**

One octave. Twelve semitones. No octave distinctions in the mental model.

This is radical simplification — and it works. It's the **Assembly language of music**.

## Why 12?

- Octave equivalence: C2 and C5 are "the same note" in different registers
- All harmony, melody, and scales reduce to patterns within 12
- Removes cognitive overhead of tracking absolute pitch
- Matches the chromatic reality of Western music

## Two Representations

### Linear (Chromatic Row)

```
0  1  2  3  4  5  6  7  8  9  10 11
C  C# D  D# E  F  F# G  G# A  A# B
```

- Useful for thinking about intervals as distances
- Adding/subtracting semitones
- Transposition = shift the pattern

### Circular (Clock Face)

```
        0 (C)
    11      1
  10          2
   9          3
    8       4
        6
      7   5
```

- Reveals cyclic nature of pitch
- Shows interval relationships geometrically
- Scales become "shapes" on the circle

## Scales as Geometry

### Critical Distinction: Scale vs. Mode

Traditional terminology conflates these. We separate them:

| Concept | Definition | Example |
|---------|------------|---------|
| **Scale** | An abstract set of intervals from 12 (rotation-independent) | Diatonic = {0, 2, 4, 5, 7, 9, 11} |
| **Mode** | A scale with a designated root note | Dorian = diatonic with root at position 2 |

**Implication:**
- The diatonic scale has **7 modes** (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)
- They are NOT different scales — same 7 notes, different roots
- "Natural minor" = Aeolian mode = diatonic scale with root at position 5
- A scale has as many modes as it has notes

**In the circular representation:**
- The *shape* shows the scale
- The *root marker* (if any) shows the mode
- Without a root marker, it's just "the scale" — mode is undefined

### Scale Examples

| Scale Name | Notes | # of Modes |
|------------|-------|------------|
| Chromatic | all 12 | 1 (symmetric) |
| Whole tone | 0, 2, 4, 6, 8, 10 | 1 (symmetric) |
| Diatonic | 0, 2, 4, 5, 7, 9, 11 | 7 |
| Pentatonic | 0, 2, 4, 7, 9 | 5 |
| Harmonic minor | 0, 2, 3, 5, 7, 8, 11 | 7 |

The *shape* on the circle reveals the scale's character:
- Symmetric shapes = fewer unique modes
- Clustered vs. spread = tension vs. openness

## The "Twelve" Tool

See: https://cbarsony.github.io/twelve/

A 6×12 grid representing:
- **6 rows** = 6 guitar strings (P4 tuning)
- **12 columns** = 12 semitones (one octave)

**Function:**
- Toggle white (allowed) / black (forbidden) per cell
- Pattern propagates uniformly due to P4 tuning
- Visual scale/mode designer for guitar

**Insight:** Because P4 tuning is regular, the diagonal pattern is *consistent* — what works on one string works on all strings, shifted by 5 semitones.

## Intervals as Numbers

Forget "minor third" or "perfect fifth" — use semitone counts:

| Semitones | Traditional Name | Simple Name |
|-----------|------------------|-------------|
| 0 | Unison | 0 |
| 1 | Minor 2nd | 1 |
| 2 | Major 2nd | 2 |
| 3 | Minor 3rd | 3 |
| 4 | Major 3rd | 4 |
| 5 | Perfect 4th | 5 |
| 6 | Tritone | 6 |
| 7 | Perfect 5th | 7 |
| 8 | Minor 6th | 8 |
| 9 | Major 6th | 9 |
| 10 | Minor 7th | 10 |
| 11 | Major 7th | 11 |

**Benefit:** Math works. Transposition = addition mod 12.

## Chords as Sets

### Core Rules

1. **A chord is 3 or 4 notes.** Period. (Triads and tetrads)
2. **A chord always has a root** — conceptually, even if not sounded
3. **Must contain at least 2 of: 1st, 3rd, 5th** — anchors chord identity
4. **2 notes = interval, not chord** — power chords are intervals
5. **Tetrads: only ONE extension allowed** — from {2, 4, 6, 7}

### The One-Extension Rule

For tetrads (4-note chords), the 4th note must be exactly ONE of:
- 2nd (add2 / add9)
- 4th (sus4 / add11)
- 6th (add6 / add13)
- 7th (seventh chords)

**Forbidden:**
- {1, 3, 5, 2, 7} — two extensions
- {1, 2, 4, 5} — two extensions
- Any chord with 2+ degrees outside {1, 3, 5}

**Reasoning:** Multiple extensions make the chord's "intention" unprocessable by the listener. One color at a time.

**Analogy:** Single Responsibility Principle — a chord should do one harmonic thing.

### Degrees Wrap at 7

Octave equivalence applies to degrees, not just pitches:

| Traditional | Simplified |
|-------------|------------|
| 8th | 1 |
| 9th | 2 |
| 10th | 3 |
| 11th | 4 |
| 12th | 5 |
| 13th | 6 |
| 14th | 7 |

**A "9th chord" is just a chord with degree 2.**
**An "11th chord" is just a chord with degree 4.**

No more ugly 7-9-11-13 terminology.

### Two Levels of Octave Equivalence

| Domain | Modulus | Meaning |
|--------|---------|---------|
| Notes (pitch) | mod 12 | All C's are the same note |
| Degrees (harmony) | mod 7 | 9th = 2nd, 13th = 6th |

This is the heart of the system: **octave is irrelevant at both levels.**

### Ambiguity as Feature

No forced major/minor classification:

- If 3rd is missing, don't label it
- Sus4 = {1, 4, 5} — neither major nor minor, and that's fine
- "Major" only means: interval between 1 and 3 is 4 semitones
- "Minor" only means: interval between 1 and 3 is 3 semitones
- No 3rd? No label needed.

Traditional terms like "major scale" are avoided — too imprecise.

### The Hidden Root

The root can be *implied* rather than played:

**Example:** Notes E-G-B with conceptual root C
- E = 3rd (4 semitones from C)
- G = 5th (7 semitones from C)  
- B = 7th (11 semitones from C)
- Result: **Cmaj7 without root** → {3, 5, 7} in degrees, {4, 7, 11} in semitones

The same notes E-G-B with root E = **Em** → {1, 3, 5}

**Implication:** Notes alone don't define the chord. Root is contextual.

### What This Excludes

| Voicing | Why Excluded |
|---------|--------------|
| Power chord (1+5) | Only 2 notes = interval |
| 1 + 7 + 2 only | Only 1 of {1, 3, 5} |
| 5+ note voicings | Exceeds 4-note limit |

This is deliberate — keeps the system tractable.

### What This Allows

| Type | Degrees | Semitones |
|------|---------|-----------|
| Major triad | {1, 3, 5} | {0, 4, 7} |
| Minor triad | {1, 3, 5} | {0, 3, 7} |
| Dim triad | {1, 3, 5} | {0, 3, 6} |
| Aug triad | {1, 3, 5} | {0, 4, 8} |
| Sus4 | {1, 4, 5} | {0, 5, 7} |
| Maj7 | {1, 3, 5, 7} | {0, 4, 7, 11} |
| Dom7 | {1, 3, 5, 7} | {0, 4, 7, 10} |
| "Add9" | {1, 2, 3, 5} | {0, 2, 4, 7} |
| Rootless maj7 | {3, 5, 7} | {4, 7, 11} |

### Notation Summary

**Degrees:** {1, 3, 5, 7} — always 1-7, octave-independent
**Semitones:** {0, 4, 7, 11} — always 0-11, octave-independent

The root note name (C, D, etc.) is separate from the chord structure.

## Application to This Tool

The MIDI editor will:
- Display notes as positions 0-11 (with optional note names)
- Show intervals numerically
- Visualize scales/chords as geometric patterns
- Use math, not tradition

---

*The whiteboard shows the **diatonic scale** — 7 notes selected from 12. Which mode? Undefined until a root is designated. The tool shows the scale geometry; the composer's mind supplies the root.*

---

## Modal Darkness Theory

### The Discovery

The 7 diatonic modes can be ordered by "darkness" (sad) to "brightness" (happy):

| Mode | Intervals | Character |
|------|-----------|-----------|
| Locrian | H-W-W-H-W-W-W | Darkest (no P5) |
| Phrygian | H-W-W-W-H-W-W | Very dark |
| Aeolian | W-H-W-W-H-W-W | Dark (middle minor) |
| Dorian | W-H-W-W-W-H-W | Neutral minor |
| Mixolydian | W-W-H-W-W-H-W | Neutral major |
| Ionian | W-W-H-W-W-W-H | Bright (middle major) |
| Lydian | W-W-W-H-W-W-H | Brightest |

### The Rule

> **Half-steps closer to root = darker. Whole-steps at bottom = brighter.**

Locrian starts H-H pattern near root → darkest.
Lydian starts W-W-W → brightest.

### Why Locrian is Special

Locrian is the only mode without a **perfect 5th from root**. This explains:
- Why it sounds "stranger" than just "sad"
- Why power chord progressions avoid it instinctively
- It lacks the fundamental anchor of the 1-5 relationship

### The Middle Modes Are Most Common

| Category | Modes | "Middle" Mode |
|----------|-------|---------------|
| Minor-ish | Phrygian, Aeolian, Dorian | **Aeolian** |
| Major-ish | Mixolydian, Ionian, Lydian | **Ionian** |

Aeolian and Ionian are the most commonly used modes in Western music.

**Why?** They maximize symmetry — balanced distribution of half-steps.

> "It's not accidental. I can prove it mathematically."

### The Urinal Principle

Why is the diatonic scale so prevalent?

**Analogy:** Men choosing urinals maximize distance from others.

The diatonic scale's 7 notes are distributed across 12 semitones with **maximal evenness**:
- Pattern: 2-2-1-2-2-2-1 (semitones between adjacent notes)
- This is the most uniform distribution possible for 7-in-12

The diatonic scale is **mathematically optimal spacing**.

### Symmetry in Exotic Scales

Observation: Exotic/non-diatonic scales sound more pleasing when their intervals follow symmetric patterns.

Examples of symmetric scales:
- Whole tone: 2-2-2-2-2-2 (perfectly symmetric)
- Diminished: 2-1-2-1-2-1-2-1 (alternating)
- Augmented: 3-1-3-1-3-1 (alternating)

### The Implication

> **Music perception is geometric. "Feelings" can be derived mathematically.**

This is why building tools to visualize the 12-note space matters — they reveal the underlying structure that our ears already know intuitively.

---

## Degree Importance Order

The brain processes intervals in order of "pleasure" (maximal distribution):

> **1st → 5th → 3rd → (extension)**

Not 1-3-5. The **5th is more fundamental than the 3rd**.

**Why?** The urinal principle again:
1. Place the root (1)
2. The 5th maximizes distance from root (7 semitones = closest to half of 12)
3. The 3rd fills the remaining gap (3 or 4 semitones from root)
4. Extensions (2, 4, 6, 7) add color after the core is established

This explains why power chords (1+5) work — they have the two most fundamental degrees.

---

## Melody

Melody = scale/chord **spread in time**.

### Rules Apply Horizontally

A melody must respect the same interval rules as simultaneous notes:
- The overlying scale defines "allowed" notes
- The current chord defines expected degrees
- Notes outside the rules = **strong signal** (key change, tension, resolution)

### Exceptions Are Musical Events

If a melody contains "forbidden" intervals (e.g., 2nd AND 7th together):
- It's not an error — it's a **signal to the listener**
- Usually indicates: key change, chromatic passing tone, intentional tension
- The system identifies these as exceptions, not failures

> "Every piece using 12-tone equal temperament can be examined by this system. If something doesn't fit, it's a sign that something exceptional is happening musically."

### Not Rigid

This system is analytical, not prescriptive. Music is human art. Rules describe patterns; breaking them is expressive.

---

## Chord Progressions

### The Minimal-Step Principle

Two adjacent chords sound best when the difference is **minimal**.

**Example:**
```
A-C-E → G-C-E
```
- Only ONE note changes (A→G)
- Creates harmony while signaling "something happened"
- Listener perceives root movement: A → C (because of interval rules)

### Voice Leading

Minimal motion between chords = smooth progression:
- Common tones stay
- Moving voices step by semitone or whole tone
- Leaps are exceptional (attention-grabbing)

### Why Traditional Theory Is Messy

Chord progression theory (I-IV-V, circle of fifths) is obscured by bad notation.

The underlying truth is simpler: **minimize note changes, maximize harmonic signal**.

---

## Out of Scope

This notation system intentionally does NOT cover:

| Topic | Reason |
|-------|--------|
| **Rhythm** | Higher abstraction layer — handled separately |
| **Voicing (octave placement)** | Higher abstraction layer — C2 vs C8 irrelevant at this level |
| **Production/mixing** | Entirely different domain |
| **Timbre/sound design** | Not about notes |
| **Dynamics (volume)** | Performance detail, not compositional structure |

The system operates at the **note-relationship level** — the "Assembly language" of music.

---

## AI Communication Format

When communicating with AI, use **degree notation**:

| Notation | Meaning |
|----------|---------|
| `{1, 3, 5}` | Major or minor triad (3rd determines quality) |
| `{1, 5}` | Power chord interval |
| `{1, 3, 5, 7}` | Seventh chord |
| `{3, 5, 7}` | Rootless voicing (root implied) |

**Always use degrees (1-7), not semitones (0-11), unless discussing specific intervals.**

Root note name (C, D, etc.) is stated separately when needed.

**Example AI conversation:**
- User: "Add a {1, 3, 5} on beat 1, root E"
- AI: "Added E minor triad {1, 3, 5} with 3=3 semitones"

---

## Open Questions

| Topic | Status |
|-------|--------|
| **Key / tonal center** | To be defined — likely involves "marking" the root in the Twelve tool |
| **Marking degrees visually** | Potential feature: highlight 1, 5, 3, and extension in the UI |

---
