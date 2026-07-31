#!/bin/bash
# Quick start script for audio analyzer

echo "🎵 Audio Beat Analyzer - Quick Start"
echo "====================================="
echo ""

# Check if in correct directory
if [ ! -d "tools/audio-analyzer" ]; then
  echo "❌ Please run this script from the repository root"
  exit 1
fi

cd tools/audio-analyzer

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  yarn install
  echo ""
fi

# Check FFmpeg
if ! command -v ffmpeg &> /dev/null; then
  echo "⚠️  FFmpeg not found. Install it to analyze video files:"
  echo "   - Ubuntu/Debian: sudo apt install ffmpeg"
  echo "   - macOS: brew install ffmpeg"
  echo "   - Windows: https://ffmpeg.org/download.html"
  echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "Usage examples:"
echo ""
echo "1. Analyze audio file:"
echo "   node cli.js path/to/audio.mp3"
echo ""
echo "2. Get only BPM:"
echo "   node cli.js audio.mp3 --bpm-only"
echo ""
echo "3. Export to JSON:"
echo "   node cli.js audio.mp3 -o output.json"
echo ""
echo "4. Analyze video (requires FFmpeg):"
echo "   node cli.js video.mp4"
echo ""
echo "5. Get help:"
echo "   node cli.js --help"
echo ""
