# HyperFrames mapping

Use this kit with [HyperFrames](https://hyperframes.video/) (HTML → deterministic MP4).

## Root composition

Suggested root attributes:

```html
<div
  data-composition-id="root"
  data-width="3840"
  data-height="2160"
  data-duration="76.42"
>
  <!-- scenes -->
</div>
```

FPS target: **60**. Seek-safe animations only (GSAP timelines, CSS that can be driven by frame time, etc.).

## One beat → one timed element

For each object in `timeline.json` → `beats[]`:

```html
<section
  data-start="5.2"
  data-duration="3.6"
  data-track-index="1"
>
  <!-- beat content -->
</section>
```

- `data-start` = `beat.start`
- `data-duration` = `beat.duration`
- Keep track indices organized (e.g. text=1, product=2, ui=3, overlays=4)

## Agent prompt (copy/paste)

```text
Read animstats-hero-clone-kit/AGENTS.md, timeline.json, and content.template.json.
Build a HyperFrames composition that clones the structure of reference/animstats-hero-video.webm
using my replacements in content.template.json.
Use 3840x2160, ~76.42s, 60fps.
Create one timed section per timeline beat.
```

## Implementation tips

1. Text scenes = HTML + CSS (+ GSAP). Easiest and highest fidelity for kinetic type.
2. Product/UI scenes can be static HTML mocks with short GSAP cursor/click animations.
3. Do not embed the reference WebM as the final video — it is for scrubbing only.
4. After first render, compare against the reference and nudge `data-start` / `data-duration` by 0.1–0.2s.
5. Put music in an audio track spanning `0` → `76.42`, normalized to −14…−16 LUFS.
