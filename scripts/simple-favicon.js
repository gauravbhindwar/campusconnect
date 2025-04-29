import fs from 'fs';
import path from 'path';

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');

// Function to copy existing favicon to required locations with new names
function copyFavicon() {
  const sourceFavicon = path.join(publicDir, 'favicon.png');
  
  if (fs.existsSync(sourceFavicon)) {
    // Just copy to standard favicon.ico name
    fs.copyFileSync(sourceFavicon, path.join(publicDir, 'favicon.ico'));
    console.log('Copied favicon.png to favicon.ico');
  } else {
    console.log('No existing favicon.png found in public directory');
  }
}

// Execute
copyFavicon();
