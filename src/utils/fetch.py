import requests
from bs4 import BeautifulSoup
import trafilatura

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
}


def extract_article_text(url: str) -> str:
    """Extract main text content from a news article URL using trafilatura with HTML fallback."""
    if not url:
        print("ERROR: No URL provided")
        return ""
    
    print(f"Attempting to extract text from: {url}")
    text = ""
    
    # Try trafilatura first
    try:
        print("Trying trafilatura extraction...")
        downloaded = trafilatura.fetch_url(url)
        if downloaded:
            text = trafilatura.extract(downloaded, include_comments=False, include_tables=False) or ""
            if text:
                print(f"Trafilatura success: extracted {len(text)} characters")
                return text.strip()
        print("Trafilatura returned no content")
    except Exception as e:
        print(f"Trafilatura failed: {str(e)}")

    # Fallback to requests + BeautifulSoup
    try:
        print("Trying BeautifulSoup fallback...")
        resp = requests.get(url, headers=DEFAULT_HEADERS, timeout=10)
        resp.raise_for_status()
        print(f"HTTP Status: {resp.status_code}")
        
        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Try common article containers
        selectors = ["article", "div.story-body", "div#content", "main"]
        chunks = []
        for sel in selectors:
            for node in soup.select(sel):
                for p in node.find_all(["p", "h2", "li"]):
                    txt = p.get_text(separator=" ", strip=True)
                    if txt:
                        chunks.append(txt)
        
        if not chunks:
            # Fallback: all paragraphs
            print("Using fallback: extracting all paragraphs")
            for p in soup.find_all("p"):
                txt = p.get_text(separator=" ", strip=True)
                if txt:
                    chunks.append(txt)
        
        text = "\n".join(chunks)
        if text:
            print(f"BeautifulSoup success: extracted {len(text)} characters")
        else:
            print("BeautifulSoup found no text content")
        return text.strip()
    except Exception as e:
        print(f"BeautifulSoup failed: {str(e)}")
        return ""