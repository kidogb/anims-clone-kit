#!/usr/bin/env node

import { Command } from 'commander';
import { AudioAnalyzer } from './analyzer.js';
import { AudioPreprocessor } from './preprocessor.js';
import { OutputFormatter } from './formatter.js';
import chalk from 'chalk';
import ora from 'ora';
import { existsSync } from 'fs';
import { resolve } from 'path';

const program = new Command();

program
  .name('analyze-audio')
  .description('Analyze audio files for beat detection, BPM calculation, and motion generation')
  .version('1.0.0')
  .argument('<audio-file>', 'Path to audio/video file (mp3, wav, ogg, webm, mp4, etc.)')
  .option('-o, --output <file>', 'Output JSON file path')
  .option('-f, --format <type>', 'Output format: json, timeline, minimal', 'json')
  .option('--no-console', 'Disable console output')
  .option('--beats-only', 'Output only beat timestamps')
  .option('--bpm-only', 'Output only BPM value')
  .action(async (audioFile, options) => {
    let tempFilePath = null;
    
    try {
      const filePath = resolve(audioFile);
      
      if (!existsSync(filePath)) {
        console.error(chalk.red(`\n❌ File not found: ${filePath}\n`));
        process.exit(1);
      }

      const preprocessor = new AudioPreprocessor();
      let processPath = filePath;
      
      if (preprocessor.needsConversion(filePath)) {
        tempFilePath = await preprocessor.convertToWav(filePath);
        processPath = tempFilePath;
      }

      const spinner = ora('Loading audio file...').start();
      const analyzer = new AudioAnalyzer();
      
      spinner.text = 'Analyzing audio...';
      const results = await analyzer.analyzeFile(processPath);
      
      results.file = filePath;
      
      spinner.succeed(chalk.green('Analysis complete!'));

      const formatter = new OutputFormatter();
      
      if (options.beatsOnly) {
        console.log(chalk.cyan('\n🎵 Beat Timestamps:\n'));
        console.log(JSON.stringify(results.beats.timestamps, null, 2));
        
        if (tempFilePath) preprocessor.cleanup(tempFilePath);
        return;
      }

      if (options.bpmOnly) {
        console.log(chalk.cyan('\n🎼 BPM:\n'));
        console.log(results.bpm.value);
        
        if (tempFilePath) preprocessor.cleanup(tempFilePath);
        return;
      }

      if (options.console !== false) {
        formatter.printConsole(results, options.format);
      }

      if (options.output) {
        spinner.start('Writing output file...');
        await formatter.writeJSON(results, options.output);
        spinner.succeed(chalk.green(`Output saved to: ${options.output}`));
      }

      if (tempFilePath) {
        preprocessor.cleanup(tempFilePath);
      }

    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}\n`));
      if (error.stack) {
        console.error(chalk.gray(error.stack));
      }
      process.exit(1);
    }
  });

program.parse();
