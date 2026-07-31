# Audio Beat Analyzer

Tool tự động phân tích nhạc, phát hiện beat và BPM để tạo motion đồng bộ với nhịp.

## Cài đặt nhanh

```bash
cd tools/audio-analyzer
yarn install
```

## Sử dụng cơ bản

```bash
# Phân tích file audio
node cli.js path/to/audio.mp3

# Chỉ lấy BPM
node cli.js audio.mp3 --bpm-only

# Xuất ra JSON
node cli.js audio.mp3 -o output.json

# Phân tích video (tự động extract audio)
node cli.js video.webm
```

## Kết quả

Tool sẽ cho bạn:

1. **BPM**: 115 (với confidence score)
2. **Beat timestamps**: [0, 0.52, 1.04, 1.57, ...]
3. **Motion recommendations**: 
   - Intensity level (slow/moderate/fast)
   - Suggested effects (hard cuts, scale pops, camera moves)
   - Timing guidelines (text entrance duration, transition speed)
4. **Effect timings**: Vị trí tốt nhất cho các effects
5. **Animation keyframes**: Ready-to-use cho animation

## Tích hợp với timeline.json

```javascript
// Copy beat timestamps vào timeline
const analysis = require('./analysis.json');

timeline.audio.accentsSeconds = analysis.beats.timestamps;
timeline.audio.bpm = analysis.bpm.value;
```

## Motion theo BPM

### Slow (< 80 BPM)
- Smooth transitions
- Text entrance: 30-40 frames
- Hold: 2-4s

### Moderate (80-120 BPM)  
- Hard cuts
- Text entrance: 18-24 frames
- Hold: 1-2s

### Fast (> 120 BPM)
- Rapid cuts
- Text entrance: 12-18 frames
- Hold: 0.5-1s

## Output ví dụ

```json
{
  "bpm": {
    "value": 115,
    "confidence": 1.0
  },
  "beats": {
    "timestamps": [0, 0.52, 1.04, ...],
    "count": 147
  },
  "motions": {
    "recommendations": {
      "intensity": "moderate",
      "suggestedEffects": [
        "hard cuts on beat",
        "quick scale pops",
        "typewriter text (15-20 chars/s)"
      ]
    }
  }
}
```

## Requirements

- Node.js >= 18
- FFmpeg (cho video files)
- 100MB RAM cho file audio ~5 phút

## Docs đầy đủ

- [README.md](README.md) - Chi tiết installation và usage
- [EXAMPLES.md](EXAMPLES.md) - Integration examples với HyperFrames, Remotion
