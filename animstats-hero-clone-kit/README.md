# AnimStats hero — portable clone kit

Self-contained brief for rebuilding the AnimStats-style hero video with **your** brand/content.

Works with **any** framework (HyperFrames, Remotion, After Effects, CSS/WebGL, etc.).

## What’s inside

| File | Purpose |
| --- | --- |
| `AGENTS.md` | **Start here for AI agents** — rules + build order |
| `CANVAS.md` | Full markdown copy of the Cursor canvas (style + animation + script) |
| `animstats-video-blueprint.canvas.tsx` | Original Cursor canvas file (backup; Cursor-only) |
| `BLUEPRINT.md` | Compact human-readable blueprint |
| `timeline.json` | Machine-readable beats (`start`, `duration`, copy, direction) |
| `content.template.json` | Fill your replacements here |
| `hyperframes.md` | How to map this kit into HyperFrames HTML |
| `reference/animstats-hero-video.webm` | Original reference master (4K / 60fps / 76.42s) |

## Copy to another project

```bash
cp -R animstats-hero-clone-kit /path/to/your-other-project/
```

Then in the other project chat:

```text
Read @animstats-hero-clone-kit/AGENTS.md and @animstats-hero-clone-kit/timeline.json.
Fill content.template.json with my brand, then scaffold the video.
```

## Master specs

- Resolution: `3840 × 2160` (16:9)
- FPS: `60`
- Duration: `76.42 s` → `4585` frames
- Audio: continuous stereo bed; normalize replacements to **−14…−16 LUFS**, ≤ **−1 dBTP**

## Legal / intent

“1:1” means matching **structure, pacing, and motion grammar**.  
Do **not** reuse AnimStats logo, product UI, templates, or soundtrack. Replace with assets you own.
