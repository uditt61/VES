import sharp from 'sharp';
import fs from 'fs';

async function generateTransparentLogo() {
  const inputPath = 'd:/VES/client/public/logoVES.jpeg';
  const outputPath = 'd:/VES/client/public/logoVES.png';

  const metadata = await sharp(inputPath).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);

  const { width, height } = metadata;
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

  const cx = width / 2;
  const cy = height / 2;

  let topY = 0;
  for (let y = 0; y < height / 2; y++) {
    const idx = (y * width + Math.floor(cx)) * info.channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (r > 60 && g < 45 && b < 45) {
      topY = y;
      break;
    }
  }

  console.log('Red circle starts at y =', topY);
  // Give it a tiny 1-2px subpixel buffer so no black edge is caught
  const radius = (cy - topY) - 1.5;
  console.log('Using radius =', radius);

  const circleSvg = `<svg width="${width}" height="${height}">
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#fff" />
  </svg>`;

  await sharp(inputPath)
    .composite([{
      input: Buffer.from(circleSvg),
      blend: 'dest-in'
    }])
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log('✅ Generated clean transparent logo at:', outputPath);
}

generateTransparentLogo().catch(console.error);
