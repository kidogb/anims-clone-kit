# Agent instructions — AnimStats-style hero clone

You are rebuilding a marketing hero video from a measured blueprint.  
This kit is framework-agnostic. Prefer the user’s stack (often **HyperFrames**).

## Required reading order

1. `content.template.json` — if `your` fields are empty, ask the user to fill them (or propose drafts).
2. `CANVAS.md` — full style + animation + script (markdown copy of the original canvas).
3. `timeline.json` — authoritative beat list (machine-readable).
4. `BLUEPRINT.md` — compact summary if needed.
5. `hyperframes.md` — only if building with HyperFrames.
6. Scrub `reference/animstats-hero-video.webm` when timing feels off (±0.1–0.2s).

## Non-negotiables

- Match **macro narrative**: Hook → Brand → Promise → Templates → Customize → Backgrounds → Export → CTA.
- Keep **one idea per beat**. No paragraph copy. No dashboard clutter in hero text scenes.
- Alternate **sparse kinetic typography** and **dense product/UI** scenes.
- Hard cuts black↔white beat soft crossfades for text scenes.
- Preserve approximate **word count / syllable length** when replacing copy (timing depends on it).
- Output size: **3840×2160 @ 60fps**, duration ≈ **76.42s** unless user shortens intentionally.
- Never reuse AnimStats trademarked assets; replace logo, UI, cards, music.

## Build order

1. Lock copy in `content.template.json`.
2. Create one scene/clip per `timeline.json` beat.
3. Implement text scenes first (fast wins, sets pacing).
4. Add product/UI mock scenes second (can be simplified HTML mocks).
5. Add music; snap major cuts to `audioAccents` in `timeline.json`.
6. Tighten timings against the reference WebM.

## Output expectations

When scaffolding code, produce:

- A scene list mapped 1:1 to `timeline.json` ids
- Timing via seconds (`data-start` / `data-duration` for HyperFrames) or frames for Remotion
- CSS variables from the palette in `BLUEPRINT.md`
- Placeholders for missing assets (logo, eyes, laptop, cards)

If something is ambiguous, prefer the reference video over inventing new beats.
