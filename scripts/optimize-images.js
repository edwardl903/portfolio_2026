#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/static/images');
const BACKUP_DIR = path.join(__dirname, '../public/static/images-backup');
const MAX_WIDTH = 1920; // Max width for images (full HD)
const QUALITY_JPG = 82; // JPG quality (0-100)
const QUALITY_PNG = 80; // PNG quality (0-100)

// Formats to optimize
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// Skip these files/folders
const SKIP_PATTERNS = ['backup', 'images-backup', 'README.md', '.pdf'];

/**
 * Check if file should be skipped
 */
function shouldSkip(filePath) {
  const name = path.basename(filePath);
  return SKIP_PATTERNS.some(pattern => name.includes(pattern));
}

/**
 * Get all image files recursively
 */
async function getImageFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (shouldSkip(fullPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SUPPORTED_FORMATS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Get file size in KB
 */
async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size / 1024; // KB
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputPath, backupPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const inputSize = await getFileSize(inputPath);

    // Create backup directory if needed
    const backupDir = path.dirname(backupPath);
    await fs.mkdir(backupDir, { recursive: true });

    // Backup original
    await fs.copyFile(inputPath, backupPath);

    let sharpInstance = sharp(inputPath);
    const metadata = await sharpInstance.metadata();

    // Resize if too large (maintain aspect ratio)
    if (metadata.width > MAX_WIDTH) {
      sharpInstance = sharpInstance.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Optimize based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharpInstance
        .jpeg({ 
          quality: QUALITY_JPG,
          mozjpeg: true // Better compression
        })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await sharpInstance
        .png({ 
          quality: QUALITY_PNG,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
    }

    const outputSize = await getFileSize(outputPath);
    const savings = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

    return {
      success: true,
      inputSize,
      outputSize,
      savings
    };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Restore from backup
 */
async function restoreFromBackup(backupPath, originalPath) {
  try {
    await fs.copyFile(backupPath, originalPath);
    return true;
  } catch (error) {
    console.error(`Error restoring ${originalPath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log('Target directory:', IMAGES_DIR);
  console.log('Backup directory:', BACKUP_DIR);
  console.log('Max width:', MAX_WIDTH);
  console.log('JPG quality:', QUALITY_JPG);
  console.log('PNG quality:', QUALITY_PNG);
  console.log('');

  // Check if images directory exists
  try {
    await fs.access(IMAGES_DIR);
  } catch (error) {
    console.error('❌ Images directory not found:', IMAGES_DIR);
    process.exit(1);
  }

  // Get all image files
  console.log('📂 Scanning for images...');
  const imageFiles = await getImageFiles(IMAGES_DIR);
  console.log(`Found ${imageFiles.length} images to optimize\n`);

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  // Show files that will be processed
  console.log('Files to optimize:');
  imageFiles.forEach(file => {
    const relativePath = path.relative(IMAGES_DIR, file);
    console.log(`  - ${relativePath}`);
  });
  console.log('');

  // Process each image
  const results = [];
  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (const inputPath of imageFiles) {
    const relativePath = path.relative(IMAGES_DIR, inputPath);
    const backupPath = path.join(BACKUP_DIR, relativePath);
    const outputPath = inputPath; // Overwrite original

    console.log(`Optimizing: ${relativePath}...`);

    const result = await optimizeImage(inputPath, outputPath, backupPath);

    if (result.success) {
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
      console.log(`  ✓ ${result.inputSize.toFixed(1)}KB → ${result.outputSize.toFixed(1)}KB (${result.savings}% reduction)`);
    } else {
      console.log(`  ✗ Error: ${result.error}`);
      // Restore from backup if optimization failed
      await restoreFromBackup(backupPath, inputPath);
    }

    results.push({ path: relativePath, ...result });
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`Total images processed: ${results.filter(r => r.success).length}`);
  console.log(`Total input size: ${totalInputSize.toFixed(1)}KB (${(totalInputSize / 1024).toFixed(2)}MB)`);
  console.log(`Total output size: ${totalOutputSize.toFixed(1)}KB (${(totalOutputSize / 1024).toFixed(2)}MB)`);
  const totalSavings = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(1);
  console.log(`Total savings: ${totalSavings}%`);
  console.log(`\n💾 Backups saved to: ${BACKUP_DIR}`);
  console.log('\n✅ Optimization complete!');
  console.log('\n💡 Tip: Review the optimized images. If you\'re happy, you can delete the backup folder.');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

