import { readFile } from 'fs/promises';
import decode from 'audio-decode';
import { detect } from 'beat-detection';

export class AudioAnalyzer {
  async analyzeFile(filePath) {
    console.log(`\n📊 Analyzing: ${filePath}\n`);

    const audioBuffer = await this.loadAudioFile(filePath);
    
    const beats = await this.detectBeats(audioBuffer);
    const bpm = await this.calculateBPM(audioBuffer, beats);
    const motions = this.generateMotions(beats, bpm, audioBuffer.duration);

    return {
      file: filePath,
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      channels: audioBuffer.numberOfChannels,
      bpm: {
        value: bpm.value,
        confidence: bpm.confidence
      },
      beats: {
        timestamps: beats,
        count: beats.length,
        averageInterval: this.calculateAverageInterval(beats)
      },
      motions: motions,
      metadata: {
        analyzedAt: new Date().toISOString(),
        analyzer: 'audio-beat-analyzer v1.0.0'
      }
    };
  }

  async loadAudioFile(filePath) {
    try {
      const audioData = await readFile(filePath);
      const audioBuffer = await decode(audioData);
      return audioBuffer;
    } catch (error) {
      throw new Error(`Failed to load audio file: ${error.message}`);
    }
  }

  async detectBeats(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    try {
      const result = detect(channelData, { fs: sampleRate });
      
      if (result.beats && result.beats.length > 0) {
        return Array.from(result.beats).map(b => parseFloat(b.toFixed(2)));
      }
    } catch (error) {
      console.warn('⚠️  Using fallback beat detection');
    }
    
    return this.fallbackBeatDetection(channelData, sampleRate);
  }

  fallbackBeatDetection(channelData, sampleRate) {
    const beats = [];
    const windowSize = Math.floor(sampleRate * 0.05);
    const hopSize = Math.floor(windowSize / 2);
    const threshold = this.calculateEnergyThreshold(channelData);

    for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
      const window = channelData.slice(i, i + windowSize);
      const energy = this.calculateRMSEnergy(window);
      
      if (energy > threshold) {
        const prevEnergy = i >= hopSize 
          ? this.calculateRMSEnergy(channelData.slice(i - hopSize, i - hopSize + windowSize))
          : 0;
        
        if (energy > prevEnergy * 1.3) {
          const timestamp = i / sampleRate;
          
          if (beats.length === 0 || timestamp - beats[beats.length - 1] > 0.1) {
            beats.push(parseFloat(timestamp.toFixed(2)));
          }
        }
      }
    }

    return beats;
  }

  async calculateBPM(audioBuffer, beats) {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    
    try {
      const result = detect(channelData, { fs: sampleRate });
      
      if (result.bpm) {
        return {
          value: Math.round(result.bpm),
          confidence: this.calculateBPMConfidence(beats, result.bpm)
        };
      }
    } catch (error) {
      console.warn('⚠️  Using fallback BPM calculation');
    }
    
    return this.fallbackBPMCalculation(beats);
  }

  fallbackBPMCalculation(beats) {
    if (beats.length < 2) {
      return { value: 120, confidence: 0.5 };
    }

    const intervals = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const bpm = 60 / avgInterval;
    const finalBpm = Math.round(Math.max(60, Math.min(200, bpm)));

    return {
      value: finalBpm,
      confidence: this.calculateBPMConfidence(beats, finalBpm)
    };
  }

  calculateRMSEnergy(samples) {
    const sum = samples.reduce((acc, val) => acc + val * val, 0);
    return Math.sqrt(sum / samples.length);
  }

  calculateEnergyThreshold(channelData) {
    const windowSize = 2048;
    const energies = [];

    for (let i = 0; i < channelData.length - windowSize; i += windowSize) {
      const window = channelData.slice(i, i + windowSize);
      energies.push(this.calculateRMSEnergy(window));
    }

    energies.sort((a, b) => a - b);
    const medianEnergy = energies[Math.floor(energies.length / 2)];
    
    return medianEnergy * 1.5;
  }

  calculateAverageInterval(beats) {
    if (beats.length < 2) return 0;
    
    const intervals = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }
    
    return parseFloat(
      (intervals.reduce((a, b) => a + b, 0) / intervals.length).toFixed(3)
    );
  }

  calculateBPMConfidence(beats, bpm) {
    if (beats.length < 4) return 0.5;

    const expectedInterval = 60 / bpm;
    let matchCount = 0;

    for (let i = 1; i < beats.length; i++) {
      const actualInterval = beats[i] - beats[i - 1];
      const ratio = actualInterval / expectedInterval;
      
      if (ratio > 0.85 && ratio < 1.15) {
        matchCount++;
      }
    }

    return parseFloat((matchCount / (beats.length - 1)).toFixed(2));
  }

  generateMotions(beats, bpmData, duration) {
    const bpm = bpmData.value;
    const beatInterval = 60 / bpm;
    const motionTypes = this.categorizeMotionIntensity(bpm);

    const motions = {
      timeline: this.generateTimeline(beats, bpm),
      effects: this.generateEffectTimings(beats, beatInterval),
      animations: this.generateAnimationKeyframes(beats, bpm, duration),
      recommendations: motionTypes
    };

    return motions;
  }

  categorizeMotionIntensity(bpm) {
    const recommendations = {
      bpm: bpm,
      intensity: '',
      suggestedEffects: [],
      timing: {}
    };

    if (bpm < 80) {
      recommendations.intensity = 'slow';
      recommendations.suggestedEffects = [
        'smooth fade transitions',
        'gentle scale animations',
        'slow camera pushes (3-6% over 3-5s)',
        'soft blur effects'
      ];
      recommendations.timing = {
        textEntrance: '30-40 frames',
        transitionDuration: '0.8-1.2s',
        holdDuration: '2-4s'
      };
    } else if (bpm < 120) {
      recommendations.intensity = 'moderate';
      recommendations.suggestedEffects = [
        'hard cuts on beat',
        'quick scale pops',
        'typewriter text (15-20 chars/s)',
        'subtle motion blur'
      ];
      recommendations.timing = {
        textEntrance: '18-24 frames',
        transitionDuration: '0.4-0.6s',
        holdDuration: '1-2s'
      };
    } else {
      recommendations.intensity = 'fast';
      recommendations.suggestedEffects = [
        'rapid hard cuts',
        'aggressive scale/rotation',
        'fast typewriter (25+ chars/s)',
        'motion blur trails',
        'stroboscopic effects'
      ];
      recommendations.timing = {
        textEntrance: '12-18 frames',
        transitionDuration: '0.2-0.4s',
        holdDuration: '0.5-1s'
      };
    }

    return recommendations;
  }

  generateTimeline(beats, bpm) {
    const timeline = [];
    const beatInterval = 60 / bpm;

    for (let i = 0; i < beats.length; i++) {
      const beatTime = beats[i];
      const nextBeat = beats[i + 1] || beatTime + beatInterval;
      
      timeline.push({
        beat: i + 1,
        start: beatTime,
        end: nextBeat,
        duration: parseFloat((nextBeat - beatTime).toFixed(2)),
        type: this.determineBeatType(i, beats.length),
        action: this.suggestAction(i, beats.length)
      });
    }

    return timeline;
  }

  determineBeatType(index, total) {
    if (index === 0) return 'intro';
    if (index === total - 1) return 'outro';
    if (index % 4 === 0) return 'emphasis';
    if (index % 2 === 0) return 'secondary';
    return 'standard';
  }

  suggestAction(index, total) {
    const actions = [
      'text entrance',
      'hard cut',
      'scale pop',
      'color transition',
      'ui element appear',
      'camera push',
      'text exit'
    ];

    const position = index / total;
    
    if (position < 0.2) return 'text entrance';
    if (position < 0.4) return 'hard cut';
    if (position < 0.6) return 'scale pop';
    if (position < 0.8) return 'ui element appear';
    return 'text exit';
  }

  generateEffectTimings(beats, beatInterval) {
    return {
      hardCuts: beats.filter((_, i) => i % 2 === 0),
      textPops: beats.filter((_, i) => i % 4 === 0),
      cameraMovements: beats.filter((_, i) => i % 8 === 0),
      particleEffects: beats.filter((_, i) => (i + 1) % 16 === 0)
    };
  }

  generateAnimationKeyframes(beats, bpm, duration) {
    const fps = 60;
    const keyframes = [];

    for (let i = 0; i < beats.length; i++) {
      const time = beats[i];
      const frame = Math.round(time * fps);
      
      keyframes.push({
        time: time,
        frame: frame,
        properties: {
          opacity: 1,
          scale: this.calculateScale(i, beats.length),
          translateY: 0,
          blur: 0
        },
        easing: 'easeOutCubic'
      });
    }

    return keyframes;
  }

  calculateScale(index, total) {
    if (index % 4 === 0) return 1.1;
    if (index % 2 === 0) return 1.05;
    return 1.0;
  }
}
