# The Valentine's Day Purrposal

Single-Page Valentine Website Implementation Plan

---

## 1. Context

This project is a playful, single-page Valentine’s Day website built as a surprise for a significant other. The intent is emotional delight, not technical complexity.

The site presents itself as a small, cat-themed experience that culminates in a gamified Valentine’s proposal. The user is allowed to choose “No,” but doing so triggers an escalating loop of increasingly absurd, humorous, and visually playful responses until they ultimately select “Yes.”

Key principles:

* Cute, not ironic
* Persistent, not aggressive
* Simple, not over-engineered
* Funny through escalation, not difficulty

This document is a source of truth and should be read top-to-bottom to execute the project.

---

## 2. Goal & Scope

### Objective

Build a single-page, cat-themed website that playfully asks “Will you be my Valentine?” using an escalating interaction loop that guarantees a joyful outcome.

### Scope

* One page only
* No backend
* No authentication
* No data persistence
* Fully client-side
* Mobile-first, desktop-compatible

### Success Criteria

* Immediate clarity of purpose
* Zero instructions required
* A memorable “Yes” moment
* Finished experience in under one minute

---

## 3. Tech Stack

* Framework: Next.js (App Router)
* Deployment: Vercel
* Language: JavaScript or TypeScript
* Styling: CSS Modules or inline styles
* Icons: react-icons (open npm library)
* State Management: React useState

---

## 4. Project Structure

Minimal structure only.

```
/app
  /page.tsx
  /globals.css
/components
  AskLoop.tsx
/public
  (empty)
```

No routing. No API routes. No layouts beyond default.

---

## 5. Page Structure & User Flow

### 5.1 Intro Section

Purpose: Set tone and invite interaction.

Content:

* Title: “The Purrposal”
* Subtext: “I have a very impawrtant question.”
* Large cat icon
* CTA button: “Begin”

Logic:

* Clicking “Begin” transitions the app from intro state to asking state.

---

### 5.2 Ask Loop (Core Interaction)

This section contains the entire Valentine logic.

State Model:

```
phase: "intro" | "asking" | "yes"
noCount: number
```

* noCount increments every time the user clicks “No”
* UI, copy, and button behavior mutate based on noCount

---

## 6. Escalation System

The escalation system is driven entirely by noCount.

Each “No”:

* Updates displayed text
* Alters button behavior
* Adds subtle visual or spatial absurdity

Tone remains playful and affectionate throughout.

### Escalation Copy Examples

1. “Are you sure?”
2. “I practiced asking this.”
3. “I skipped a nap for this.”
4. “That didn’t feel correct.”
5. “The No button seems… nervous.”
6. “I already told my cat friends.”
7. “Okay. Last chance.”

---

## 7. Button Behavior Progression

The “No” button evolves over time.

| No Count | Behavior                |
| -------- | ----------------------- |
| 1–2      | Normal                  |
| 3        | Slightly shrinks        |
| 4        | Swaps position with Yes |
| 5        | Moves away from cursor  |
| 6        | Changes label text      |
| 7        | Disappears entirely     |

Final state:

* Only “Yes” remains
* “Yes” button grows larger
* Centered prominently

---

## 8. Yes State (Success)

Trigger:

* User clicks “Yes” at any time

Effects:

* Floating hearts
* Cat icons bouncing or animating
* Positive reinforcement copy

Suggested copy:
“Best decision you’ve made all day.”

Optional:

* Reveal date plan
* Prompt to screenshot

---

## 9. Icon Strategy

No custom images are used.

All visuals come from react-icons.

Icons should:

* Scale large
* Animate lightly
* Replace all imagery needs

---

## 10. Styling Guidelines

* Soft pastel background
* Large readable typography
* Rounded buttons
* High contrast
* Simple CSS animations using transform and opacity only

Avoid heavy animation libraries.

---

## 11. Deployment Steps

1. Create Next.js app
2. Implement single-page logic
3. Test on mobile viewport
4. Push to GitHub
5. Deploy via Vercel
6. Share link without explanation

---

## 12. Explicit Non-Goals

* Backend services
* Analytics
* Tracking
* Data storage
* Multi-page navigation
* Advanced accessibility requirements

This project prioritizes emotional impact over extensibility.

---

## 13. Final Checklist

* Page loads instantly
* Interaction works on mobile
* “No” escalation is clear and funny
* “Yes” payoff feels celebratory
* Experience feels personal, not generic

End of plan.
