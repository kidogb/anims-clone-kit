import { writeFile } from 'fs/promises';
import chalk from 'chalk';

export class OutputFormatter {
  printConsole(results, format = 'json') {
    console.log(chalk.bold('\n═══════════════════════════════════════════════════════\n'));
    console.log(chalk.bold.cyan('🎵 AUDIO ANALYSIS RESULTS'));
    console.log(chalk.bold('\n═══════════════════════════════════════════════════════\n'));

    console.log(chalk.bold('📁 File Information:'));
    console.log(`   Path: ${results.file}`);
    console.log(`   Duration: ${results.duration.toFixed(2)}s`);
    console.log(`   Sample Rate: ${results.sampleRate} Hz`);
    console.log(`   Channels: ${results.channels}`);

    console.log(chalk.bold('\n🎼 BPM Analysis:'));
    console.log(`   BPM: ${chalk.green.bold(results.bpm.value)}`);
    console.log(`   Confidence: ${this.getConfidenceBar(results.bpm.confidence)} ${(results.bpm.confidence * 100).toFixed(0)}%`);

    console.log(chalk.bold('\n🥁 Beat Detection:'));
    console.log(`   Total Beats: ${chalk.yellow.bold(results.beats.count)}`);
    console.log(`   Average Interval: ${results.beats.averageInterval.toFixed(3)}s`);

    if (format === 'timeline' || format === 'json') {
      console.log(chalk.bold('\n⏱️  Beat Timestamps:'));
      this.printBeatsTable(results.beats.timestamps);
    }

    console.log(chalk.bold('\n🎬 Motion Recommendations:'));
    console.log(`   Intensity: ${this.getIntensityColor(results.motions.recommendations.intensity)}`);
    console.log(`   BPM Category: ${results.motions.recommendations.bpm} BPM`);
    
    console.log(chalk.bold('\n   Suggested Effects:'));
    results.motions.recommendations.suggestedEffects.forEach(effect => {
      console.log(`   • ${effect}`);
    });

    console.log(chalk.bold('\n   Timing Guidelines:'));
    Object.entries(results.motions.recommendations.timing).forEach(([key, value]) => {
      console.log(`   • ${this.formatKey(key)}: ${chalk.cyan(value)}`);
    });

    console.log(chalk.bold('\n🎯 Effect Timings:'));
    console.log(`   Hard Cuts: ${results.motions.effects.hardCuts.length} positions`);
    console.log(`   Text Pops: ${results.motions.effects.textPops.length} positions`);
    console.log(`   Camera Movements: ${results.motions.effects.cameraMovements.length} positions`);
    console.log(`   Particle Effects: ${results.motions.effects.particleEffects.length} positions`);

    if (format === 'timeline') {
      console.log(chalk.bold('\n📊 Timeline Preview:'));
      this.printTimelinePreview(results.motions.timeline.slice(0, 10));
      if (results.motions.timeline.length > 10) {
        console.log(chalk.gray(`   ... and ${results.motions.timeline.length - 10} more beats`));
      }
    }

    console.log(chalk.bold('\n═══════════════════════════════════════════════════════\n'));
    console.log(chalk.gray(`Analyzed at: ${results.metadata.analyzedAt}`));
    console.log(chalk.bold('\n'));
  }

  printBeatsTable(beats) {
    const columns = 8;
    for (let i = 0; i < beats.length; i += columns) {
      const row = beats.slice(i, i + columns)
        .map(b => b.toString().padStart(6))
        .join('  ');
      console.log(`   ${chalk.yellow(row)}`);
    }
  }

  printTimelinePreview(timeline) {
    timeline.forEach(beat => {
      const bar = this.createProgressBar(beat.duration, 3);
      console.log(
        `   Beat ${beat.beat.toString().padStart(2)}: ` +
        `${beat.start.toFixed(2)}s ${bar} ${beat.duration.toFixed(2)}s ` +
        chalk.gray(`[${beat.type}]`) + ` ${chalk.cyan(beat.action)}`
      );
    });
  }

  createProgressBar(duration, maxDuration) {
    const width = 20;
    const filled = Math.min(Math.floor((duration / maxDuration) * width), width);
    const empty = width - filled;
    return chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
  }

  getConfidenceBar(confidence) {
    const width = 10;
    const filled = Math.floor(confidence * width);
    const empty = width - filled;
    
    let color = chalk.red;
    if (confidence > 0.7) color = chalk.green;
    else if (confidence > 0.4) color = chalk.yellow;
    
    return color('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
  }

  getIntensityColor(intensity) {
    const colors = {
      slow: chalk.blue('SLOW'),
      moderate: chalk.yellow('MODERATE'),
      fast: chalk.red('FAST')
    };
    return colors[intensity] || chalk.white(intensity.toUpperCase());
  }

  formatKey(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  async writeJSON(results, outputPath) {
    const output = {
      ...results,
      usage: {
        forTimeline: {
          accentsSeconds: results.beats.timestamps,
          bpm: results.bpm.value
        },
        forHyperFrames: {
          beats: results.motions.timeline.map(b => ({
            start: b.start,
            duration: b.duration,
            action: b.action
          }))
        },
        forRemotion: {
          keyframes: results.motions.animations
        }
      }
    };

    await writeFile(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  }
}
