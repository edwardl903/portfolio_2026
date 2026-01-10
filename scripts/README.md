# Image Optimization Scripts

## optimize-images.js

Automated script to compress and optimize images in your portfolio.

### Features

- ✅ Compresses JPG and PNG images
- ✅ Automatically resizes images that are too large (max 1920px width)
- ✅ Creates backups before optimizing
- ✅ Preserves folder structure
- ✅ Shows detailed progress and statistics

### Usage

```bash
npm run optimize-images
```

### What it does

1. **Scans** all images in `public/static/images/`
2. **Backs up** originals to `public/static/images-backup/`
3. **Optimizes** images with quality settings:
   - JPG: 82% quality (good balance of size/quality)
   - PNG: 80% quality with max compression
   - Resizes images wider than 1920px (maintains aspect ratio)
4. **Reports** savings and statistics

### Settings

You can adjust quality settings in `scripts/optimize-images.js`:

```javascript
const QUALITY_JPG = 82;  // JPG quality (0-100, higher = better quality)
const QUALITY_PNG = 80;  // PNG quality (0-100)
const MAX_WIDTH = 1920;  // Max image width in pixels
```

### Safety

- ✅ Creates backups before modifying
- ✅ Preserves original folder structure
- ✅ Can restore from backup if needed
- ✅ Skips PDFs and backup folders

### Expected Results

- **File size reduction**: 60-90% typical
- **Quality**: Visually similar, optimized for web
- **Speed**: Much faster page loads

### After Running

1. Review optimized images in your browser
2. If satisfied, delete the backup folder:
   ```bash
   rm -rf public/static/images-backup
   ```
3. If not satisfied, restore from backup (manually copy back)

### Notes

- The script processes images **in place** (overwrites originals)
- Always committed? Consider committing before running
- Large images may take a few seconds each
- First run creates backups, subsequent runs update them

