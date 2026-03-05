import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'public/Pizza Pics';

async function convertAll() {
    const files = fs.readdirSync(inputDir);
    for (const file of files) {
        if (file.endsWith('.png')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(inputDir, file.replace('.png', '.webp'));
            console.log(`Converting ${inputPath} to ${outputPath}...`);
            await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
            console.log(`Done: ${outputPath}`);
        }
    }
}

convertAll().catch(console.error);
