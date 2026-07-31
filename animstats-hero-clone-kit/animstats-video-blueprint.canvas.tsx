import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

/** fps = 60 → frame = round(seconds * 60) */
const script = [
  ["0–18", "0.00–0.30", "#F6F6F6 blank beat", "Solid #F6F6F6; no text"],
  ["18–48", "0.30–0.80", "Are you", "Black bold sans on #F6F6F6; centered"],
  ["48–90", "0.80–1.50", "ready", "Hard cut black ↔ white; motion-blur / ghost trails"],
  ["90–132", "1.50–2.20", "get / to", "Black BG; white type; thin geometric accents (circle, +, △, bracket)"],
  ["132–210", "2.20–3.50", "x10 more", "Vertical slot-scroll; stacked echoes; all-caps ghosts"],
  ["210–270", "3.50–4.50", "engagement", "Centered white lowercase; stacked outline echoes"],
  ["270–312", "4.50–5.20", "Grab more attention?", "White BG; “attention?” diagonal + motion blur + small circle accent"],
  ["312–390", "5.20–6.50", "Introducing", "White BG; black centered title-case"],
  ["390–450", "6.50–7.50", "Target / ripple mark", "Concentric ring + center dot + radial ticks; scales up"],
  ["450–528", "7.50–8.80", "AnimStats lockup", "Black wand-in-circle + “Animstats”; purple/yellow spark particles"],
  ["528–678", "8.80–11.30", "Laptop product reveal", "Closed black laptop → opens → editor UI ($1,320 MRR / Visitors cards)"],
  ["678–780", "11.30–13.00", "Turn → Turn your stats into", "White BG; per-word / phrase assemble"],
  ["780–858", "13.00–14.30", "Captivating", "Black BG; purple→pink→gold gradient fill text"],
  ["858–966", "14.30–16.10", "animated → GIFs/Videos", "White “animated”; then gradient “GIFs/Videos” with offset shadow"],
  ["966–1140", "16.10–19.00", "Choose from different", "Gradient phrase on dark textured BG"],
  ["1140–1182", "19.00–19.70", "Premium templates|", "Typewriter + caret; ghost remainder preview"],
  ["1182–1464", "19.70–24.40", "Template card stack", "7 stacked gradient cards; flame pill; flower photo accent"],
  ["1464–1584", "24.40–26.40", "Template wall / MRR", "Floating cards in dark 3D space; camera push"],
  ["1584–1806", "26.40–30.10", "Write your stats → MRR edit", "Headline then editor crop; Counter $5→$1,000 live"],
  ["1806–1962", "30.10–32.70", "Easily / Customize it / to your liking", "White BG; “Customize it” gradient purple→gold"],
  ["1962–2508", "32.70–41.80", "Emoji / Product of the day walkthrough", "Full editor; cursor; rank/emoji/size controls; laurel #1 card"],
  ["2508–2640", "41.80–44.00", "Choose from curated / selection / of cool", "Black kinetic type clauses"],
  ["2640–2790", "44.00–46.50", "backgrounds", "Outline stroke text over flowing pink/purple/orange bands"],
  ["2790–3300", "46.50–55.00", "Background picker walkthrough", "Solid → image → animated swatches; preview updates"],
  ["3300–3534", "55.00–58.90", "Rocket counter demo", "Followers + rocket; 0→1,050; several motion BGs; aspect flips"],
  ["3534–3615", "58.90–60.25", "Custom / Custom watermark", "Tilted “Custom” then gradient “Custom watermark”"],
  ["3615–3855", "60.25–64.25", "Watermark typing → days card", "Types “Twitter”; countdown card (8/10 days) + eyes motif"],
  ["3855–3948", "64.25–65.80", "Export your stats as", "Gradient phrase on black"],
  ["3948–4068", "65.80–67.80", "Gif toggle → Video toggle", "Oversized pill; white then purple→gold BG"],
  ["4068–4242", "67.80–70.70", "Export action + generate", "Editor crop; GIF/Video switch; Generate click; wait modal"],
  ["4242–4326", "70.70–72.10", "Grab more attention", "3D googly eyes on purple→peach→yellow card"],
  ["4326–4458", "72.10–74.30", "Share your stats in / remarkable / way", "Black type; gradient “remarkable”; tiled “way” DOF"],
  ["4458–4585", "74.30–76.42", "End card", "Wand icon → AnimStats lockup → animstats.com"],
];

const audioHits = [
  ["0.30 / 0.50 / 0.90", "Hook text hits", "Each early word/cut lands on a music accent"],
  ["5.25 / 5.75 / 6.85", "Brand transition", "Attention? → Introducing → mark"],
  ["8.40 / 8.65 / 9.20 / 10.50", "Logo + laptop", "Lockup sparkle then device open"],
  ["11.79 / 12.84 / 13.39 / 14.64", "Promise block", "Turn / Captivating / animated peaks"],
  ["15.94 / 16.99 / 18.29 / 18.84 / 20.14", "Templates intro", "GIFs/Videos → Choose → Premium → card burst"],
  ["22.44 / 22.99 / 27.19 / 28.24 / 30.09", "Template → edit", "Card swaps then Write your stats"],
  ["31.34 / 34.23 / 35.53 / 36.58", "Customize section", "Easily / Customize / editor interactions"],
  ["48.03 / 50.13 / 52.23 / 55.12 / 56.37", "Backgrounds", "Picker clicks + animated BG demos"],
  ["58.87 / 60.57 / 63.47 / 64.77 / 65.27", "Watermark → export", "Custom watermark + Export headline"],
  ["67.17 / 68.42 / 69.52 / 70.52 / 72.07 / 72.62", "CTA close", "Toggle / Generate / eyes / remarkable / way"],
];

const assets = [
  ["Logo mark", "Black circle + white magic wand + 3 sparkles", "Required — end card + brand reveal"],
  ["Wordmark", "“AnimStats” / “Animstats” bold geometric sans", "Required"],
  ["URL", "animstats.com (or your domain)", "Required end card"],
  ["Laptop device", "Black MacBook-like 3D; opens lid", "Required product reveal (~8.8–11.3s)"],
  ["Editor UI chrome", "Dark SaaS: Template/Gradient/Solid/Backgrounds, Editor/Exports, Generate glow, Gif/Video toggle, 4:3, Section #1 panel", "Can be real product or high-fidelity mock"],
  ["Template cards (6–8)", "Followers pill, MRR chart, countdown days, chat/typing, 2×2 grid, Product of the day laurel, collaboration avatars", "Required template burst"],
  ["Flame / emoji / rocket", "3D flame, mind-blown emoji, rocket, money-mouth", "Used in cards + picker demo"],
  ["Googly eyes", "Two white capsules + black pupils + highlight", "Watermark card + CTA attention shot"],
  ["Cursor", "White arrow pointer", "All UI walkthroughs"],
  ["Particles / confetti", "Purple/yellow/black spark dust; confetti on counters", "Logo + card celebrations"],
  ["Animated backgrounds", "Wavy purple, neon geometry, blobs, red bars, mesh", "Background demo block"],
  ["Geometric accents", "Thin circle, triangle, plus, bracket", "Hook “get” beat"],
  ["Music bed", "Continuous energetic electronic; no long silence", "Full 76.4s; normalize −14 to −16 LUFS"],
];

const contentSlots = [
  ["Hook question", "Are you / ready / get / x10 more / engagement / attention?", "", "Keep 5–7 short beats"],
  ["Brand name", "AnimStats", "", "Same syllable count if possible"],
  ["Tag / intro", "Introducing", "", "One word preferred"],
  ["Core promise", "Turn your stats into Captivating animated GIFs/Videos", "", "Split across white then black scenes"],
  ["Template line", "Choose from different Premium templates", "", "End with typewriter"],
  ["Edit headline", "Write your stats", "", "Then show live number change"],
  ["Customize line", "Easily Customize it to your liking", "", "Gradient on middle phrase"],
  ["Backgrounds line", "Choose from curated selection of cool backgrounds", "", "Clause-by-clause"],
  ["Watermark line", "Custom watermark", "", "Then type brand handle"],
  ["Export line", "Export your stats as Gif / Video", "", "Two toggle states"],
  ["Benefit CTA", "Grab more attention", "", "With eyes motif"],
  ["Close line", "Share your stats in remarkable way", "", "Emphasize one adjective"],
  ["URL", "animstats.com", "", "End card"],
  ["Hero metric", "MRR $5 → $1,000 / Followers +1,050", "", "One clear count-up story"],
];

const palette = [
  ["Paper white", "#F6F6F6", "Opening blank + early white scenes"],
  ["Pure white", "#FFFFFF", "Most white typography scenes / end card"],
  ["True black", "#000000", "Dark type scenes + card stage"],
  ["Near black", "#0A0A0A–#121212", "Soft dark typewriter scenes"],
  ["Gradient purple", "#A060C0 / #A868C0", "Left stop of emphasis text"],
  ["Gradient rose", "#B88898 / #C09090", "Mid stop"],
  ["Gradient gold", "#D8B860 / #E0B858 / #E8C830", "Right stop"],
  ["Card peach", "#FBEDC0 / #FCE8B5", "Front template card fill"],
  ["Card lavender", "#ACACF6", "Stacked template cards"],
  ["UI hot pink", "~#FF0080 family", "Generate / Update Link / BG accents"],
  ["UI focus blue", "bright input ring", "Active Counter field"],
];

const motionDefaults = [
  ["Text entrance", "18–30f", "opacity 0→1 + y ±10–30px or scale 0.92→1; easeOutCubic"],
  ["Text exit / hard cut", "0–10f", "Prefer hard black/white cut over long crossfade"],
  ["Typewriter", "~2–3 chars / 100ms", "Caret blink ~30f on / 30f off"],
  ["Card stack advance", "24–48f", "Perspective 6–12°; offset 40–90px; springy settle"],
  ["Camera push", "slow 3–6%", "Over 2–4s holds on product/UI"],
  ["Diagonal sweep", "~20–35°", "Strong directional blur on attention? / Custom"],
  ["UI cursor move", "linear ~12–24f", "Then click; preview updates same frame or +2–4f"],
  ["Count-up", "0.8–1.5s", "Ease-out numeric; confetti near end"],
];

function SectionBar({ start, end, label, width }: { start: string; end: string; label: string; width: string }) {
  const theme = useHostTheme();
  return (
    <div style={{ width, minWidth: 90 }}>
      <div style={{ height: 8, background: theme.accent.primary, borderRadius: 9999 }} />
      <Text size="small" weight="semibold" style={{ marginTop: 6 }}>{label}</Text>
      <Text size="small" tone="tertiary">{start}–{end}</Text>
    </div>
  );
}

export default function AnimStatsVideoBlueprint() {
  const theme = useHostTheme();
  return (
    <Stack gap={24} style={{ padding: 28, maxWidth: 1480, margin: "0 auto" }}>
      <Stack gap={8}>
        <Row gap={8} align="center" wrap>
          <Pill tone="info">v2 — script + frames + audio + assets</Pill>
          <Pill tone="neutral">60 fps · frame = round(s × 60)</Pill>
          <Pill tone="warning">Copy timings ±6–12 frames until you scrub the master</Pill>
        </Row>
        <H1>AnimStats hero video — reconstruction blueprint</H1>
        <Text tone="secondary">
          Shot script, Remotion frame ranges, sampled colors, audio accents, asset list, and empty slots for your replacement content.
        </Text>
      </Stack>

      <Grid columns="1.4fr 1fr" gap={16}>
        <Card>
          <CardHeader>Source master</CardHeader>
          <CardBody>
            <Grid columns={3} gap={16}>
              <Stat label="Duration" value="76.42 s" />
              <Stat label="Frame rate" value="60 fps" />
              <Stat label="Frames" value="4,585" />
              <Stat label="Resolution" value="3840 × 2160" />
              <Stat label="Aspect" value="16:9" />
              <Stat label="Codec" value="VP8 + Vorbis" />
            </Grid>
          </CardBody>
        </Card>
        <Stack gap={10}>
          <H3>Remotion composition</H3>
          <Text><Code>width: 3840</Code> · <Code>height: 2160</Code> · <Code>fps: 60</Code> · <Code>durationInFrames: 4585</Code></Text>
          <Text>Audio continuous 76.407s stereo 44.1 kHz. Source is hot (−5.74 LUFS / +4.62 dBTP) — normalize replacement to −14…−16 LUFS, ≤−1 dBTP.</Text>
          <Callout tone="info">
            Build one <Code>{"<Sequence>"}</Code> per script row. Lock your copy lengths before refining frame edges.
          </Callout>
        </Stack>
      </Grid>

      <Divider />

      <Stack gap={12}>
        <H2>Macro pacing</H2>
        <div style={{ overflowX: "auto", paddingBottom: 6 }}>
          <Row gap={6} align="start" style={{ minWidth: 1080 }}>
            <SectionBar start="0:00" end="0:05" label="Hook" width="8%" />
            <SectionBar start="0:05" end="0:11" label="Brand" width="10%" />
            <SectionBar start="0:11" end="0:20" label="Promise" width="14%" />
            <SectionBar start="0:20" end="0:30" label="Templates" width="16%" />
            <SectionBar start="0:30" end="0:42" label="Customize" width="19%" />
            <SectionBar start="0:42" end="0:59" label="Backgrounds" width="27%" />
            <SectionBar start="0:59" end="1:11" label="Export" width="19%" />
            <SectionBar start="1:11" end="1:16" label="CTA" width="8%" />
          </Row>
        </div>
      </Stack>

      <Stack gap={12}>
        <H2>Exact script + Remotion frame ranges</H2>
        <Text tone="secondary">On-screen copy as observed from the WebM. Frame ranges are working targets for scaffolding.</Text>
        <Table
          stickyHeader
          striped
          headers={["Frames", "Time (s)", "On-screen copy", "Direction"]}
          rows={script}
        />
      </Stack>

      <Grid columns="1fr 1fr" gap={20}>
        <Stack gap={12}>
          <H2>Audio accent map</H2>
          <Text tone="secondary">Music is continuous (no long silence). Accents detected from RMS peaks — sync hard cuts and text pops to these.</Text>
          <Table headers={["Approx times (s)", "Section", "Use"]} rows={audioHits} />
          <Callout tone="warning">
            This is an energy map, not a BPM grid. After you pick a track, re-snap cuts to your downbeats.
          </Callout>
        </Stack>
        <Stack gap={12}>
          <H2>Motion defaults (start here)</H2>
          <Table headers={["Pattern", "Duration", "Recipe"]} rows={motionDefaults} />
          <H3>Typography</H3>
          <Text>Bold geometric sans (practical: Inter / Manrope / Geist). Exact family unconfirmed from raster.</Text>
          <Text>4K sizes: labels 72–100px · sentences 100–150px · hero 190–300px · oversized 320–500px. Weight ~600–750.</Text>
        </Stack>
      </Grid>

      <Divider />

      <Grid columns="1fr 1fr" gap={20}>
        <Stack gap={12}>
          <H2>Sampled palette</H2>
          <Table headers={["Role", "Value", "Where"]} rows={palette} framed={false} />
          <Text size="small" tone="tertiary">Gradient emphasis ≈ linear left→right #A060C0 → #B88898 → #E0B858.</Text>
        </Stack>
        <Stack gap={12}>
          <H2>Asset inventory</H2>
          <Table headers={["Asset", "What it looks like", "Notes"]} rows={assets} />
        </Stack>
      </Grid>

      <Stack gap={12}>
        <H2>Your content — fill this in</H2>
        <Text tone="secondary">Replace the AnimStats column with your words/metrics. Keep length close so frame ranges still fit.</Text>
        <Table
          stickyHeader
          striped
          headers={["Slot", "Original", "Your replacement", "Constraint"]}
          rows={contentSlots}
        />
        <Callout tone="info">
          After filling replacements, ask the agent: “Scaffold Remotion sequences from @animstats-video-blueprint.canvas.tsx using my content table.”
        </Callout>
      </Stack>

      <Card>
        <CardHeader trailing={<Pill tone="neutral">Build order</Pill>}>How to use this file</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Text>1. Fill the <Text as="span" weight="semibold">Your replacement</Text> column.</Text>
            <Text>2. Gather or mock the assets marked Required.</Text>
            <Text>3. Create Remotion sequences from the Frames column (one per row).</Text>
            <Text>4. Drop in music; snap major cuts to the audio accent map.</Text>
            <Text>5. Scrub against <Code>src/animstats-hero-video.webm</Code> and tighten ±6–12 frames per beat.</Text>
          </Stack>
        </CardBody>
      </Card>

      <Text size="small" tone="tertiary" style={{ color: theme.text.tertiary }}>
        Source: src/animstats-hero-video.webm · measured locally · “1:1” = structure, timing, motion grammar — not reuse of their logo/UI/soundtrack.
      </Text>
    </Stack>
  );
}
