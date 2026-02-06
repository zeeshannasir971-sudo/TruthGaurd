import re
import string
from typing import List

import nltk
from nltk.corpus import stopwords

# Ensure stopwords are available at runtime
try:
    _ = stopwords.words('english')
except LookupError:
    nltk.download('stopwords')

PUNCT_TABLE = str.maketrans('', '', string.punctuation)

URL_REGEX = re.compile(r"https?://\S+|www\.\S+")
MULTISPACE_REGEX = re.compile(r"\s+")


def clean_text(text: str) -> str:
    """Basic text cleaning: remove URLs, punctuation, lowercase, collapse spaces."""
    if not text:
        return ""
    text = URL_REGEX.sub(" ", text)
    text = text.translate(PUNCT_TABLE)
    text = text.lower()
    text = MULTISPACE_REGEX.sub(" ", text)
    return text.strip()


def tokenize(text: str) -> List[str]:
    if not text:
        return []
    tokens = text.split()
    stops = set(stopwords.words('english'))
    return [t for t in tokens if t not in stops and t.isalpha() and len(t) > 2]