# Audio Beat Analyzer

Công cụ phân tích âm thanh tự động để phát hiện beat, tính BPM, và tạo motion timeline cho video.

## Tính năng

- **Beat Detection**: Phát hiện tự động các điểm nhấn mạnh trong nhạc (beat/accent)
- **BPM Calculation**: Tính toán BPM (beats per minute) của bài nhạc
- **Motion Generation**: Tạo motion timeline và keyframes dựa trên rhythm
- **Multiple Output Formats**: Xuất ra JSON, console, hoặc timeline format
- **Universal Audio Support**: Hỗ trợ nhiều định dạng audio (MP3, WAV, OGG, WebM, v.v.)

## Cài đặt

```bash
cd tools/audio-analyzer
yarn install
```

Hoặc với npm:

```bash
cd tools/audio-analyzer
npm install
```

## Sử dụng

### Cơ bản

```bash
node cli.js path/to/your/audio.mp3
```

### Xuất kết quả ra file JSON

```bash
node cli.js path/to/audio.mp3 -o output.json
```

### Chỉ hiển thị beat timestamps

```bash
node cli.js path/to/audio.mp3 --beats-only
```

### Chỉ hiển thị BPM

```bash
node cli.js path/to/audio.mp3 --bpm-only
```

### Format options

```bash
# Timeline format - hiển thị chi tiết từng beat
node cli.js audio.mp3 -f timeline

# Minimal format - chỉ thông tin cơ bản
node cli.js audio.mp3 -f minimal

# JSON format (default)
node cli.js audio.mp3 -f json
```

## Output

### Console Output

Tool sẽ hiển thị:
- Thông tin file audio (duration, sample rate, channels)
- BPM với confidence score
- Số lượng beats và interval trung bình
- Beat timestamps
- Motion recommendations (intensity, effects, timing guidelines)
- Effect timings (hard cuts, text pops, camera movements, particle effects)
- Timeline preview

### JSON Output

File JSON xuất ra bao gồm:

```json
{
  "file": "path/to/audio.mp3",
  "duration": 76.42,
  "sampleRate": 44100,
  "channels": 2,
  "bpm": {
    "value": 128,
    "confidence": 0.85
  },
  "beats": {
    "timestamps": [0.3, 0.8, 1.2, ...],
    "count": 44,
    "averageInterval": 0.468
  },
  "motions": {
    "timeline": [...],
    "effects": {
      "hardCuts": [...],
      "textPops": [...],
      "cameraMovements": [...],
      "particleEffects": [...]
    },
    "animations": [...],
    "recommendations": {
      "intensity": "moderate",
      "suggestedEffects": [...],
      "timing": {...}
    }
  },
  "usage": {
    "forTimeline": {
      "accentsSeconds": [...],
      "bpm": 128
    },
    "forHyperFrames": {...},
    "forRemotion": {...}
  }
}
```

## Tích hợp với Timeline

### Cập nhật timeline.json

Sau khi phân tích, bạn có thể copy beat timestamps vào `timeline.json`:

```json
{
  "audio": {
    "accentsSeconds": [0.3, 0.5, 0.9, 5.25, ...],
    "bpm": 128
  }
}
```

### Sử dụng với HyperFrames

Dùng section `usage.forHyperFrames` để ánh xạ beats vào scenes:

```javascript
beats.forEach(beat => {
  const scene = createScene({
    start: beat.start,
    duration: beat.duration,
    action: beat.action
  });
});
```

### Sử dụng với Remotion

Dùng keyframes từ `usage.forRemotion`:

```javascript
import { interpolate, useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();
const keyframes = results.motions.animations;
```

## Motion Recommendations

Tool tự động đề xuất motion dựa trên BPM:

### Slow (< 80 BPM)
- Smooth fade transitions
- Gentle scale animations
- Slow camera pushes (3-6% over 3-5s)
- Text entrance: 30-40 frames

### Moderate (80-120 BPM)
- Hard cuts on beat
- Quick scale pops
- Typewriter text (15-20 chars/s)
- Text entrance: 18-24 frames

### Fast (> 120 BPM)
- Rapid hard cuts
- Aggressive scale/rotation
- Fast typewriter (25+ chars/s)
- Motion blur trails
- Text entrance: 12-18 frames

## API Usage

Bạn cũng có thể import và sử dụng trực tiếp trong code:

```javascript
import { AudioAnalyzer } from './analyzer.js';

const analyzer = new AudioAnalyzer();
const results = await analyzer.analyzeFile('audio.mp3');

console.log('BPM:', results.bpm.value);
console.log('Beats:', results.beats.timestamps);
console.log('Motions:', results.motions);
```

## Yêu cầu hệ thống

- Node.js >= 18.0.0
- Đủ RAM để load file audio vào memory
- Đối với file lớn (>100MB), có thể mất vài phút để phân tích

## Troubleshooting

### Lỗi "Failed to load audio file"

Đảm bảo file audio không bị corrupt và format được hỗ trợ. Thử convert sang WAV nếu gặp vấn đề:

```bash
ffmpeg -i input.mp3 output.wav
```

### BPM không chính xác

Tool sử dụng thuật toán tự động có thể không hoàn hảo với:
- Nhạc không có beat rõ ràng (ambient, classical)
- BPM thay đổi trong bài (tempo changes)
- Nhạc quá nhiễu hoặc chất lượng thấp

Trong trường hợp này, có thể điều chỉnh manually hoặc sử dụng DAW để extract tempo.

### Beat detection bị thiếu hoặc thừa

Điều chỉnh threshold bằng cách modify `calculateEnergyThreshold()` trong `analyzer.js`.

## Ví dụ

Xem folder `examples/` để tham khảo output với các loại nhạc khác nhau.

## License

MIT
