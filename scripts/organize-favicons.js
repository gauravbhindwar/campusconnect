import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Create images directory in public if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created /public/images directory');
}

// Source SVG path
const svgPath = path.join(__dirname, '../public/crewsity.svg');

// Generate favicon files from SVG
async function generateFavicons() {
  try {
    // Create favicon.ico (simple version - just a 32x32 PNG)
    await sharp(svgPath)
      .resize(32, 32)
      .toFile(path.join(imagesDir, 'favicon.ico'));
    
    // Create other standard favicon files
    await sharp(svgPath).resize(16, 16).toFile(path.join(imagesDir, 'favicon-16x16.png'));
    await sharp(svgPath).resize(32, 32).toFile(path.join(imagesDir, 'favicon-32x32.png'));
    await sharp(svgPath).resize(180, 180).toFile(path.join(imagesDir, 'apple-touch-icon.png'));
    await sharp(svgPath).resize(192, 192).toFile(path.join(imagesDir, 'android-chrome-192x192.png'));
    await sharp(svgPath).resize(512, 512).toFile(path.join(imagesDir, 'android-chrome-512x512.png'));
    
    console.log('Generated favicon files in public/images directory');
  } catch (err) {
    console.error('Error generating favicons:', err);
  }
}

// Copy favicon from src/app to public/images if it exists
function copyExistingFavicon() {
  const srcFavicon = path.join(__dirname, '../src/app/favicon.ico');
  const destFavicon = path.join(imagesDir, 'favicon.ico');
  
  if (fs.existsSync(srcFavicon)) {
    fs.copyFileSync(srcFavicon, destFavicon);
    console.log('Copied existing favicon.ico from src/app to public/images');
  } else {
    console.log('No existing favicon.ico found in src/app');
  }
}

// Execute
copyExistingFavicon();
generateFavicons().catch(console.error);
