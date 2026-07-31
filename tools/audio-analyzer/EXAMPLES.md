# Audio Beat Analyzer - Usage Examples

## Example 1: Basic Analysis

```bash
node cli.js ../../animstats-hero-clone-kit/reference/animstats-hero-video.webm
```

Output:
```
═══════════════════════════════════════════════════════
🎵 AUDIO ANALYSIS RESULTS
═══════════════════════════════════════════════════════

📁 File Information:
   Duration: 76.42s
   Sample Rate: 44100 Hz
   Channels: 2

🎼 BPM Analysis:
   BPM: 128
   Confidence: ████████░░ 85%

🥁 Beat Detection:
   Total Beats: 44
   Average Interval: 0.468s

⏱️  Beat Timestamps:
   0.30   0.50   0.90   5.25   5.75   6.85   8.40   8.65
   ...

🎬 Motion Recommendations:
   Intensity: MODERATE
   BPM Category: 128 BPM
   
   Suggested Effects:
   • Hard cuts on beat
   • Quick scale pops
   • Typewriter text (15-20 chars/s)
   • Subtle motion blur
```

## Example 2: Generate JSON for Timeline Integration

```bash
node cli.js audio.mp3 -o analysis-result.json
```

Then update your `timeline.json`:

```javascript
// Read the analysis
const analysis = JSON.parse(fs.readFileSync('analysis-result.json'));

// Update timeline
const timeline = JSON.parse(fs.readFileSync('timeline.json'));
timeline.audio.accentsSeconds = analysis.usage.forTimeline.accentsSeconds;
timeline.audio.bpm = analysis.usage.forTimeline.bpm;
```

## Example 3: Quick BPM Check

```bash
node cli.js song.mp3 --bpm-only
```

Output:
```
128
```

## Example 4: Extract Only Beat Timestamps

```bash
node cli.js song.mp3 --beats-only
```

Output:
```json
[0.3, 0.5, 0.9, 5.25, 5.75, 6.85, 8.4, ...]
```

## Example 5: Timeline Format for Manual Review

```bash
node cli.js audio.mp3 -f timeline
```

Shows detailed beat-by-beat breakdown with suggested actions.

## Integration with Video Builder

### HyperFrames

```javascript
import { AudioAnalyzer } from './tools/audio-analyzer/analyzer.js';

const analyzer = new AudioAnalyzer();
const analysis = await analyzer.analyzeFile('music.mp3');

// Generate scenes from beats
analysis.motions.timeline.forEach((beat, index) => {
  const scene = `
    <div data-start="${beat.start}" data-duration="${beat.duration}">
      <!-- ${beat.action} -->
    </div>
  `;
});
```

### Remotion

```javascript
import { useCurrentFrame, interpolate } from 'remotion';

export const MyComp = ({ audioAnalysis }) => {
  const frame = useCurrentFrame();
  
  // Sync animations with beats
  const keyframe = audioAnalysis.motions.animations.find(
    kf => kf.frame === frame
  );
  
  const scale = interpolate(
    frame,
    [0, 30],
    [0, keyframe?.properties.scale || 1]
  );
  
  return <div style={{ transform: `scale(${scale})` }} />;
};
```

## Motion Sync Patterns

### Pattern 1: Hard Cut on Every Beat

```javascript
const hardCutTimes = analysis.motions.effects.hardCuts;

hardCutTimes.forEach(time => {
  createScene({
    start: time,
    transition: 'cut',
    background: time % 2 === 0 ? 'black' : 'white'
  });
});
```

### Pattern 2: Text Pop on Strong Beats

```javascript
const textPopTimes = analysis.motions.effects.textPops;

textPopTimes.forEach((time, i) => {
  createTextScene({
    start: time,
    text: textArray[i],
    entrance: 'pop',
    duration: analysis.beats.averageInterval
  });
});
```

### Pattern 3: Camera Push on Downbeat

```javascript
const cameraTimes = analysis.motions.effects.cameraMovements;

cameraTimes.forEach(time => {
  addCameraKeyframe({
    time: time,
    scale: 1.0,
    endScale: 1.05,
    duration: 3.0,
    easing: 'linear'
  });
});
```

## Batch Processing

Process multiple audio files:

```bash
#!/bin/bash
for file in audio/*.mp3; do
  filename=$(basename "$file" .mp3)
  node cli.js "$file" -o "results/${filename}-analysis.json"
done
```

## Tips

1. **Adjust timing**: Analysis gives approximate timestamps. Fine-tune by ±0.1-0.2s
2. **Combine with manual**: Use auto-detection as starting point, refine manually
3. **Test with reference**: Compare results with original video timing
4. **Multiple passes**: Run analysis multiple times for different tempo interpretations
