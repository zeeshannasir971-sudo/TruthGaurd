from textblob import TextBlob
from dataclasses import dataclass

@dataclass
class SentimentResult:
    polarity: float
    subjectivity: float


def sentiment_features(text: str) -> SentimentResult:
    if not text:
        return SentimentResult(0.0, 0.0)
    blob = TextBlob(text)
    s = blob.sentiment
    return SentimentResult(polarity=float(s.polarity), subjectivity=float(s.subjectivity))