import sharp from 'sharp';
import { promises as fs } from 'fs';

async function generateFavicons() {
  const svgPath = path.join(__dirname, '../public/crewsity.svg');
  const publicDir = path.join(__dirname, '../public/images'); // Updated path

  // Ensure directory exists
  await fs.mkdir(publicDir, { recursive: true });
  
  // ICO conversion requires native modules that might not be available
  // Just create a high-quality 32x32 PNG and use that as main favicon
  await sharp(svgPath)
    .resize(32, 32)
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico replacement');

  // Standard favicon PNGs
  await sharp(svgPath).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(svgPath).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  
  // Apple Touch Icon
  await sharp(svgPath)
    .resize(180, 180)
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  
  // Android Chrome icons
  await sharp(svgPath)
    .resize(192, 192)
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  
  await sharp(svgPath)
    .resize(512, 512)
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    
  // OG and Twitter images
  await sharp(svgPath)
    .resize(1200, 630)
    .toFile(path.join(publicDir, 'og-image.png'));
  
  // Copy OG image to twitter image
  await fs.copyFile(
    path.join(publicDir, 'og-image.png'),
    path.join(publicDir, 'twitter-image.png')
  );

  console.log('All favicons generated successfully');
}

generateFavicons().catch(console.error);
