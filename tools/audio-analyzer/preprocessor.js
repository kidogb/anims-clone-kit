import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, basename, extname } from 'path';
import { tmpdir } from 'os';

const execAsync = promisify(exec);

export class AudioPreprocessor {
  constructor() {
    this.tempDir = join(tmpdir(), 'audio-analyzer-temp');
    if (!existsSync(this.tempDir)) {
      mkdirSync(this.tempDir, { recursive: true });
    }
  }

  needsConversion(filePath) {
    const ext = extname(filePath).toLowerCase();
    const videoFormats = ['.webm', '.mp4', '.mkv', '.avi', '.mov', '.flv', '.wmv'];
    const needsFFmpeg = ['.m4a', '.aac', '.ogg', '.opus'];
    
    return videoFormats.includes(ext) || needsFFmpeg.includes(ext);
  }

  async convertToWav(filePath) {
    const fileName = basename(filePath, extname(filePath));
    const outputPath = join(this.tempDir, `${fileName}-converted.wav`);

    console.log('🔄 Converting audio to WAV format...');

    try {
      const command = `ffmpeg -i "${filePath}" -vn -acodec pcm_s16le -ar 44100 -ac 2 "${outputPath}" -y`;
      await execAsync(command, { maxBuffer: 1024 * 1024 * 10 });
      
      console.log('✓ Conversion complete\n');
      return outputPath;
    } catch (error) {
      throw new Error(`FFmpeg conversion failed: ${error.message}\n\nMake sure FFmpeg is installed: https://ffmpeg.org/download.html`);
    }
  }

  cleanup(tempPath) {
    try {
      if (tempPath && existsSync(tempPath) && tempPath.includes(this.tempDir)) {
        unlinkSync(tempPath);
      }
    } catch (error) {
      console.warn('⚠️  Could not cleanup temp file:', error.message);
    }
  }
}
