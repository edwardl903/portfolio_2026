# Portfolio Images

This folder contains all images used in the portfolio website, organized by page/section.

## 📁 Folder Structure

### `home/`
Profile and hero section images:
- `profile-picture.jpg` - Main profile photo for the hero section (300x300px recommended)

### `about/`
Personal photos and adventure images:
- `edward-portrait.jpg` - Main portrait photo
- `charlie-dog.jpg` - Pet photo
- `family-photo.jpg` - Family photo
- `graduation-friends.jpg` - Graduation with friends
- `mount-washington.jpg` - Mount Washington hike
- `killington-snowboarding.jpg` - Snowboarding at Killington
- `sunday-river.JPG` - Sunday River snowboarding

### `projects/`
Project-related images organized by project:

#### `chesslytics/`
- `chesslytics-project.jpg` - Main project image
- `chesslytics-azure.jpg` - Azure Analytics project image
- `chesslytics-diagram.png` - Architecture diagram
- `chesslytics-initial-diagram.png` - Initial architecture diagram
- `chesslytics-azure-pipeline.png` - Azure pipeline diagram

#### `spotifriend/`
- `spotifriend-project.jpg` - Main project image

#### `nlp-pipeline/`
- `nlp-pipeline-project.jpg` - Main project image
- `nlp-pipeline-project.pdf` - Project PDF document

#### `movie-recommendations/`
- `movie-recommendations-project.jpg` - Main project image
- `movie-embedding-clusters.jpg` - Embedding clusters visualization
- `movie-recommendation-project.pdf` - Project PDF document

#### `etl-tools/`
- `etl-tools-project.jpg` - Fidelity PB Optimize project image
- `pison-technology.jpg` - Pison Technology project image

#### `eeg-research/`
- `research-lab-project.jpg` - Research lab project image

#### `charts/`
Shared chart and visualization images used across projects:
- `confusion-matrix.jpg` - Confusion matrix chart
- `hyperparameters-tuning.jpg` - Hyperparameter tuning visualization
- `logistic-regression.jpg` - Logistic regression visualization
- `rf-confusion-matrix.jpg` - Random forest confusion matrix
- `rf-random-search.jpg` - Random forest random search results
- `sample-dashboard.png` - Sample dashboard
- `tv-rmse-diff-alpha.jpg` - Time series RMSE with different alpha
- `tv-rmse-same-alpha.jpg` - Time series RMSE with same alpha

### `hobbies/`
Hobby-related images organized by hobby:

#### `chess/`
- `chess-hobby.jpg` - Chess hobby image
- `bc.jpg` - Boston College tournament photo
- `eboard.png` - Executive board members photo
- `founders.png` - Chess club founders photo
- `meeting1.jpg` - Weekly meeting photo 1
- `meeting2.jpg` - Weekly meeting photo 2

#### `piano/`
- `piano-hobby.jpg` - Piano hobby image
- `justin-piano-duet.jpg` - Piano duet performance photo

#### `volleyball/`
- `volleyball-hobby.jpg` - Volleyball hobby image

#### `skateboarding/`
- `skateboarding-hobby.jpg` - Skateboarding hobby image

### `resume/`
Resume documents:
- `EdwardLai_DataEnthusiast_Resume2025.pdf` - Resume PDF

### `shared/`
Shared assets used across multiple pages:
- `backup.png` - Backup/utility image
- `databricks.png` - Databricks logo/icon

## 🔗 Image Paths in Code

All images are referenced using the `/static/images/` prefix. For example:
- `/static/images/home/profile-picture.jpg`
- `/static/images/about/edward-portrait.jpg`
- `/static/images/projects/chesslytics/chesslytics-project.jpg`
- `/static/images/hobbies/chess/bc.jpg`
- `/static/images/resume/EdwardLai_DataEnthusiast_Resume2025.pdf`

## 📐 Recommended Image Sizes

- **Profile Picture**: 300x300px (square)
- **Project Images**: 400x250px (landscape)
- **Hobby Images**: 150x150px (square)
- **About Photos**: Varies based on layout

## 💡 Best Practices

1. **Keep filenames consistent** - Use kebab-case for all image filenames
2. **Optimize for web** - Compress images to reduce file size while maintaining quality
3. **Use appropriate formats** - JPG for photos, PNG for graphics/logos with transparency
4. **Maintain folder structure** - Add new images to the appropriate folder based on where they're used
