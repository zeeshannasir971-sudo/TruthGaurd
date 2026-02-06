from duckduckgo_search import DDGS
from typing import List, Dict


def web_corroborate(query: str, max_results: int = 5) -> List[Dict]:
    """Search the web for corroborating sources using DuckDuckGo.
    Returns a list of results with title and link.
    """
    if not query:
        return []
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
        # Normalize
        output = []
        for r in results:
            output.append({
                "title": r.get("title"),
                "link": r.get("href") or r.get("url"),
                "snippet": r.get("body"),
            })
        return output
    except Exception:
        return []