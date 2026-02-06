import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
import string
from collections import Counter

from src.utils.preprocess import clean_text
from src.utils.sentiment import sentiment_features
from scipy.sparse import hstack, csr_matrix
from sklearn.model_selection import GridSearchCV, StratifiedKFold
import numpy as np

MODEL_DIR = os.path.join("src", "ml", "artifacts")
MODEL_PATH = os.path.join(MODEL_DIR, "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl")
# New: separate word and char vectorizers
VECTORIZER_WORD_PATH = os.path.join(MODEL_DIR, "tfidf_word_vectorizer.pkl")
VECTORIZER_CHAR_PATH = os.path.join(MODEL_DIR, "tfidf_char_vectorizer.pkl")


def build_features(texts):
    cleaned = [clean_text(t) for t in texts]
    senti = [sentiment_features(t) for t in cleaned]
    return cleaned, senti


def train_model(dataset_csv: str = os.path.join("src", "data", "kaggle_fake_real_combined.csv")):
    os.makedirs(MODEL_DIR, exist_ok=True)
    df = pd.read_csv(dataset_csv)
    texts = df["text"].astype(str).tolist()
    labels = df["label"].astype(int).tolist()
    n_samples = len(labels)

    cleaned, senti = build_features(texts)

    # Word-level TF-IDF (memory-aware)
    vectorizer_word = TfidfVectorizer(
        max_features=100000,
        ngram_range=(1, 2),
        sublinear_tf=True,
        min_df=3,
        dtype=np.float32,
    )
    # Character-level TF-IDF (memory-aware)
    vectorizer_char = TfidfVectorizer(
        analyzer='char',
        ngram_range=(3, 4),
        sublinear_tf=True,
        min_df=3,
        max_features=50000,
        dtype=np.float32,
    )
    X_word = vectorizer_word.fit_transform(cleaned)
    X_char = vectorizer_char.fit_transform(cleaned)
    X_text = hstack([X_word, X_char])

    # Baseline model (no sentiment/style features): Linear SVM + calibrated probabilities
    Xb_train, Xb_test, yb_train, yb_test = train_test_split(
        X_text, labels, test_size=0.2, random_state=42, stratify=labels
    )
    print(f"Data Split: 80% Training ({len(yb_train)} samples), 20% Testing ({len(yb_test)} samples)")
    yb_counts = Counter(yb_train)
    yb_min = min(yb_counts.values())
    if yb_min < 2:
        baseline_clf = LogisticRegression(max_iter=400, class_weight='balanced')
    else:
        cv_b = 2 if yb_min < 3 else 3
        baseline_svc = LinearSVC(class_weight='balanced')
        baseline_clf = CalibratedClassifierCV(baseline_svc, method='sigmoid', cv=cv_b)
    baseline_clf.fit(Xb_train, yb_train)
    yb_pred = baseline_clf.predict(Xb_test)
    print("Baseline (no sentiment/style) Accuracy:", accuracy_score(yb_test, yb_pred))
    print("Baseline (no sentiment/style) Report:\n", classification_report(yb_test, yb_pred))

    # Baseline model (no sentiment/style features) with CV-tuned Logistic Regression (memory-aware)
    Xb_train, Xb_test, yb_train, yb_test = train_test_split(
        X_text, labels, test_size=0.2, random_state=42, stratify=labels
    )
    yb_counts = Counter(yb_train)
    yb_min = min(yb_counts.values())
    cv_b = min(3, max(2, yb_min))
    if yb_min < 2 or n_samples > 20000:
        baseline_clf = LogisticRegression(max_iter=1000, class_weight='balanced', solver='liblinear', C=1.0)
    else:
        skf_b = StratifiedKFold(n_splits=cv_b, shuffle=True, random_state=42)
        lr_b = LogisticRegression(max_iter=1000, class_weight='balanced')
        grid_b = GridSearchCV(
            lr_b,
            param_grid={"C": [0.5, 1, 2], "solver": ["liblinear"]},
            cv=skf_b,
            n_jobs=1,
            scoring="f1",
        )
        grid_b.fit(Xb_train, yb_train)
        baseline_clf = grid_b.best_estimator_
        print("Baseline best params:", grid_b.best_params_)
        print("Baseline CV best f1:", grid_b.best_score_)
    baseline_clf.fit(Xb_train, yb_train)
    yb_pred = baseline_clf.predict(Xb_test)
    print("Baseline (no sentiment/style) Accuracy:", accuracy_score(yb_test, yb_pred))
    print("Baseline (no sentiment/style) Report:\n", classification_report(yb_test, yb_pred))

    # Combine sentiment features + simple style features
    def style_feats(t: str):
        if not t:
            return (0.0, 0.0, 0.0)
        total = max(len(t), 1)
        exclam = t.count('!') / total
        letters = sum(1 for c in t if c.isalpha())
        upper = (sum(1 for c in t if c.isupper()) / max(letters, 1)) if letters else 0.0
        punct = (sum(1 for c in t if c in string.punctuation) / total)
        return (exclam, upper, punct)

    style = [style_feats(t) for t in texts]
    senti_mat = np.array([[s.polarity, s.subjectivity] for s in senti])
    style_mat = np.array(style)
    small_feats = csr_matrix(np.hstack([senti_mat, style_mat]))
    X = hstack([X_text, small_feats])

    X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42, stratify=labels)

    y_counts = Counter(y_train)
    y_min = min(y_counts.values())
    cv = min(3, max(2, y_min))
    if y_min < 2 or n_samples > 20000:
        clf = LogisticRegression(max_iter=1000, class_weight='balanced', solver='liblinear', C=1.0)
    else:
        skf = StratifiedKFold(n_splits=cv, shuffle=True, random_state=42)
        lr = LogisticRegression(max_iter=1000, class_weight='balanced')
        grid = GridSearchCV(
            lr,
            param_grid={"C": [0.5, 1, 2], "solver": ["liblinear"]},
            cv=skf,
            n_jobs=1,
            scoring="f1",
        )
        grid.fit(X_train, y_train)
        clf = grid.best_estimator_
        print("With sentiment+style best params:", grid.best_params_)
        print("With sentiment+style CV best f1:", grid.best_score_)
    
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)
    print("With sentiment+style Accuracy:", accuracy_score(y_test, y_pred))
    print("With sentiment+style Report:\n", classification_report(y_test, y_pred))

    # Retrain final model on full data using best estimator (or current clf params)
    if y_min < 2:
        final_lr = LogisticRegression(max_iter=1000, class_weight='balanced', solver='liblinear', C=1.0)
    else:
        # reuse best params if available
        final_lr = LogisticRegression(
            max_iter=1000,
            class_weight='balanced',
            solver=getattr(clf, 'solver', 'liblinear'),
            C=getattr(clf, 'C', 1.0),
        )
    final_lr.fit(X, labels)

    joblib.dump(final_lr, MODEL_PATH)
    joblib.dump(vectorizer_word, VECTORIZER_WORD_PATH)
    joblib.dump(vectorizer_char, VECTORIZER_CHAR_PATH)


def load_model():
    clf = joblib.load(MODEL_PATH)
    # Load both vectorizers
    vectorizer_word = joblib.load(VECTORIZER_WORD_PATH)
    vectorizer_char = joblib.load(VECTORIZER_CHAR_PATH)
    return clf, vectorizer_word, vectorizer_char


def predict(text: str):
    import numpy as np

    clf, vectorizer_word, vectorizer_char = load_model()
    cleaned = clean_text(text)
    X_word = vectorizer_word.transform([cleaned])
    X_char = vectorizer_char.transform([cleaned])
    X_text = hstack([X_word, X_char])

    s = sentiment_features(cleaned)
    # Compute style features for the input on RAW text
    total = max(len(text), 1)
    exclam = text.count('!') / total
    letters = sum(1 for c in text if c.isalpha())
    upper = (sum(1 for c in text if c.isupper()) / max(letters, 1)) if letters else 0.0
    punct = (sum(1 for c in text if c in string.punctuation) / total)

    small_feats = csr_matrix(np.array([[s.polarity, s.subjectivity, exclam, upper, punct]]))
    X = hstack([X_text, small_feats])

    proba = clf.predict_proba(X)[0]
    label = int(np.argmax(proba))
    return {
        "label": label,
        "prob_fake": float(proba[1]) if len(proba) > 1 else float(proba[0]),
        "sentiment": {"polarity": s.polarity, "subjectivity": s.subjectivity},
    }

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Train fake news detector")
    parser.add_argument("--dataset_csv", type=str, default=os.path.join("src", "data", "kaggle_fake_real_combined.csv"),
                        help="Path to training CSV with columns: text,label (0/1)")
    args = parser.parse_args()
    train_model(dataset_csv=args.dataset_csv)