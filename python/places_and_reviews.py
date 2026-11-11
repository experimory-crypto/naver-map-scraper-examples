"""Search Naver Map places, then fetch visitor reviews of the top results.

Usage:
    pip install requests
    APIFY_TOKEN=... python places_and_reviews.py "성수 카페"
"""
import os
import sys

import requests

API = "https://api.apify.com/v2/acts/{actor}/run-sync-get-dataset-items"
HEADERS = {"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"}


def run(actor: str, actor_input: dict) -> list[dict]:
    response = requests.post(API.format(actor=actor), json=actor_input, headers=HEADERS, timeout=300)
    response.raise_for_status()
    return response.json()


query = sys.argv[1] if len(sys.argv) > 1 else "성수 카페"

places = run("magenta_courser~naver-place-search-scraper", {"queries": [query], "maxPlacesPerQuery": 10})
for place in places:
    print(place["rank"], place["name"], place["visitorReviewScore"], place["visitorReviewCount"], place["roadAddress"])

top_ids = [place["id"] for place in places[:3]]
rows = run(
    "magenta_courser~naver-place-reviews-scraper",
    {"places": top_ids, "maxReviewsPerPlace": 20, "includePlaceSummary": False},
)
for row in rows:
    print(row["placeName"], row["rating"], (row["text"] or "")[:60])
