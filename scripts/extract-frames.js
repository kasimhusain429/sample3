const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const videoPath = path.join(__dirname, '../public/assets/motion_2.0-fast_A_slow_cinematic_smooth_tracking_shot_moving_forward_through_a_stunning_sun-dren-0.mp4');
const outputDir = path.join(__dirname, '../public/assets/hero-frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames from:', videoPath);
console.log('Outputting to:', outputDir);

ffmpeg(videoPath)
  .outputOptions([
    '-vf fps=30', // Extract all 30 frames per second for full video length
    '-qscale:v 2' // High quality JPG
  ])
  .output(path.join(outputDir, 'frame_%04d.jpg'))
  .on('end', () => {
    console.log('Frame extraction complete.');
  })
  .on('error', (err) => {
    console.error('Error extracting frames:', err);
  })
  .run();
