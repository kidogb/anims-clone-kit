# Blueprint — AnimStats hero video

Measured from `reference/animstats-hero-video.webm`.

## Master

| Spec | Value |
| --- | --- |
| Duration | 76.42 s |
| FPS | 60 |
| Frames | 4585 |
| Resolution | 3840 × 2160 |
| Aspect | 16:9 |
| Video codec | VP8 (WebM) |
| Audio | Vorbis, 44.1 kHz, stereo, continuous |
| Source loudness | −5.74 LUFS / +4.62 dBTP (too hot — do not copy level) |
| Target loudness | −14…−16 LUFS, true peak ≤ −1 dBTP |

## Macro pacing

| Section | Time | Feel |
| --- | --- | --- |
| Hook | 0:00–0:05 | Ultra-fast kinetic question |
| Brand | 0:05–0:11 | Introducing → mark → logo → laptop |
| Promise | 0:11–0:20 | Turn stats into captivating GIFs/Videos + templates line |
| Templates | 0:20–0:30 | Card stack / wall + write stats / MRR edit |
| Customize | 0:30–0:42 | Easily customize + long emoji/editor walkthrough |
| Backgrounds | 0:42–0:59 | Curated backgrounds + picker + rocket demo |
| Export | 0:59–1:11 | Watermark → export as Gif/Video → Generate |
| CTA | 1:11–1:16 | Eyes attention → remarkable way → end card |

## Shot script

Frame = `round(seconds * 60)`. Ranges are scaffolding targets (±6–12 frames until scrubbed).

| Frames | Time (s) | On-screen | Direction |
| --- | --- | --- | --- |
| 0–18 | 0.00–0.30 | blank | Solid `#F6F6F6` |
| 18–48 | 0.30–0.80 | Are you | Black bold on `#F6F6F6`, centered |
| 48–90 | 0.80–1.50 | ready | Hard cut black↔white; motion blur / ghosts |
| 90–132 | 1.50–2.20 | get / to | Black BG; geometric accents (circle, +, △, bracket) |
| 132–210 | 2.20–3.50 | x10 more | Vertical slot-scroll; stacked echoes |
| 210–270 | 3.50–4.50 | engagement | White lowercase; outline echoes |
| 270–312 | 4.50–5.20 | Grab more attention? | Diagonal “attention?” + blur + small circle |
| 312–390 | 5.20–6.50 | Introducing | White BG; black title-case |
| 390–450 | 6.50–7.50 | target / ripple | Concentric ring + ticks; scales up |
| 450–528 | 7.50–8.80 | brand lockup | Wand-in-circle + wordmark + spark particles |
| 528–678 | 8.80–11.30 | laptop reveal | Closed → open → editor UI |
| 678–780 | 11.30–13.00 | Turn your stats into | White; phrase assembles |
| 780–858 | 13.00–14.30 | Captivating | Black; purple→gold gradient text |
| 858–966 | 14.30–16.10 | animated → GIFs/Videos | White then gradient + offset shadow |
| 966–1140 | 16.10–19.00 | Choose from different | Gradient on dark texture |
| 1140–1182 | 19.00–19.70 | Premium templates\| | Typewriter + caret |
| 1182–1464 | 19.70–24.40 | template card stack | ~7 stacked gradient cards |
| 1464–1584 | 24.40–26.40 | template wall | Floating cards; camera push |
| 1584–1806 | 26.40–30.10 | Write your stats → MRR edit | Headline then editor; count-up |
| 1806–1962 | 30.10–32.70 | Easily / Customize it / … | White; gradient on “Customize it” |
| 1962–2508 | 32.70–41.80 | emoji walkthrough | Longest UI demo; cursor; Product of the day |
| 2508–2640 | 41.80–44.00 | Choose from curated… | Black kinetic clauses |
| 2640–2790 | 44.00–46.50 | backgrounds | Outline text over color bands |
| 2790–3300 | 46.50–55.00 | background picker | Solid → image → animated |
| 3300–3534 | 55.00–58.90 | rocket counter | 0→1050; aspect flips |
| 3534–3615 | 58.90–60.25 | Custom watermark | Tilt then gradient phrase |
| 3615–3855 | 60.25–64.25 | watermark typing | Types handle; days card + eyes |
| 3855–3948 | 64.25–65.80 | Export your stats as | Gradient on black |
| 3948–4068 | 65.80–67.80 | Gif → Video toggle | Oversized pill UI |
| 4068–4242 | 67.80–70.70 | Generate action | Switch + Generate + wait modal |
| 4242–4326 | 70.70–72.10 | Grab more attention | Googly eyes on gradient |
| 4326–4458 | 72.10–74.30 | Share… remarkable way | Gradient adjective; tiled “way” |
| 4458–4585 | 74.30–76.42 | end card | Icon → wordmark → URL |

## Palette (sampled)

| Role | Value |
| --- | --- |
| Paper white | `#F6F6F6` |
| Pure white | `#FFFFFF` |
| True black | `#000000` |
| Near black | `#0A0A0A`–`#121212` |
| Gradient purple | `#A060C0` / `#A868C0` |
| Gradient rose | `#B88898` / `#C09090` |
| Gradient gold | `#D8B860` / `#E0B858` / `#E8C830` |
| Card peach | `#FBEDC0` / `#FCE8B5` |
| Card lavender | `#ACACF6` |
| UI hot pink | `~#FF0080` family |
| Emphasis gradient | `linear-gradient(90deg, #A060C0, #B88898, #E0B858)` |

## Typography

- Bold geometric sans (practical: Inter / Manrope / Geist)
- 4K sizes: labels 72–100px · sentences 100–150px · hero 190–300px · oversized 320–500px
- Weight ~600–750
- Centered alignment dominates

## Motion defaults

| Pattern | Duration | Recipe |
| --- | --- | --- |
| Text entrance | 18–30f | opacity 0→1 + y ±10–30px or scale 0.92→1; easeOutCubic |
| Hard cut | 0–10f | Prefer cut over long crossfade |
| Typewriter | ~2–3 chars / 100ms | caret blink ~30f on / 30f off |
| Card stack | 24–48f | perspective 6–12°; offset 40–90px |
| Camera push | 2–4s | scale +3–6% |
| Diagonal sweep | — | rotate ~20–35° + directional blur |
| Cursor move | 12–24f | linear then click; preview updates ±2–4f |
| Count-up | 0.8–1.5s | ease-out; confetti near end |

## Audio accents (approx seconds)

Snap hard cuts / text pops near these energy peaks:

`0.30, 0.50, 0.90, 5.25, 5.75, 6.85, 8.40, 8.65, 9.20, 10.50, 11.79, 12.84, 13.39, 14.64, 15.94, 16.99, 18.29, 18.84, 20.14, 22.44, 22.99, 27.19, 28.24, 30.09, 31.34, 34.23, 35.53, 36.58, 48.03, 50.13, 52.23, 55.12, 56.37, 58.87, 60.57, 63.47, 64.77, 65.27, 67.17, 68.42, 69.52, 70.52, 72.07, 72.62`

## Assets required (replace with yours)

1. Logo mark (circle + icon)
2. Wordmark
3. URL
4. Laptop / device reveal (or simplified substitute)
5. Editor UI mock (dark SaaS chrome)
6. 6–8 template cards
7. Icons/emojis (flame, rocket, etc.)
8. Googly-eyes motif (or brand equivalent)
9. Cursor
10. Particles / confetti
11. Animated backgrounds set
12. Music bed (full duration)
