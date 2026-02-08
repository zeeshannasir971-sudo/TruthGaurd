# Training Data

This directory contains the datasets used for training the fake news detection model.

## Files (Not included in Git due to size)

- `kaggle_fake_real_combined.csv` (106.29 MB) - Main training dataset
- `sample_news.csv` - Small sample dataset for testing

## Dataset Information

### Main Dataset (kaggle_fake_real_combined.csv)
- **Size:** 106.29 MB
- **Samples:** 8,980 articles
- **Columns:** `text`, `label`
- **Labels:** 0 (Real), 1 (Fake)
- **Source:** Kaggle fake/real news datasets

### Sample Dataset (sample_news.csv)
- Small subset for quick testing
- Included in repository

## How to Get the Dataset

Due to GitHub's file size limitations, the main dataset is not included.

### Option 1: Download from Kaggle
1. Visit Kaggle fake news datasets
2. Download and combine datasets
3. Place in this directory as `kaggle_fake_real_combined.csv`

### Option 2: Use Sample Data
The `sample_news.csv` file is included for testing purposes.

### Option 3: Create Your Own
Collect news articles with labels and format as:
```csv
text,label
"Article text here...",0
"Fake article text...",1
```

## Dataset Format

Required CSV format:
- **Column 1:** `text` - The article text content
- **Column 2:** `label` - 0 for real news, 1 for fake news

Example:
```csv
text,label
"Breaking news: Scientists discover...",0
"SHOCKING: You won't believe...",1
```

## Training the Model

Once you have the dataset:

```bash
python -m src.ml.pipeline --dataset_csv src/data/kaggle_fake_real_combined.csv
```

Or use the sample data:

```bash
python -m src.ml.pipeline --dataset_csv src/data/sample_news.csv
```

## Data Privacy

- Do not commit sensitive or copyrighted data
- Ensure you have rights to use the dataset
- Follow data usage guidelines from the source
