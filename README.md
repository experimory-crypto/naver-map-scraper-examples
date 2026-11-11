# Korean local & e-commerce data for developers and AI agents

Examples for getting live data from **Naver Map, Kakao Map, Naver Shopping and Olive Young** through [Apify](https://apify.com) Actors. No Naver or Kakao login or API key is needed, only an Apify API token.

| Data | Actor | Input → Output |
|---|---|---|
| Naver Map places | [naver-place-search-scraper](https://apify.com/magenta_courser/naver-place-search-scraper) | Keyword → businesses with address, phone, coordinates, rating, review counts |
| Naver Map reviews | [naver-place-reviews-scraper](https://apify.com/magenta_courser/naver-place-reviews-scraper) | Place ID or URL → visitor reviews with rating, text, date, keywords, owner reply |
| Kakao Map places | [kakaomap-place-search-scraper](https://apify.com/magenta_courser/kakaomap-place-search-scraper) | Keyword → businesses, same field names as the Naver Actor |
| Naver Shopping ranks | [naver-shopping-rank-tracker](https://apify.com/magenta_courser/naver-shopping-rank-tracker) | Keyword → ranked products with price, store, reviews |
| Olive Young best sellers | [oliveyoung-ranking-scraper](https://apify.com/magenta_courser/oliveyoung-ranking-scraper) | Market and category → Top 100 ranking with price and rank change |
| Daiso Korea best sellers | [daiso-ranking-scraper](https://apify.com/magenta_courser/daiso-ranking-scraper) | Category → ranked products with price |
| MCP server, local data | [korea-local-data-mcp](https://apify.com/magenta_courser/korea-local-data-mcp) | Naver Map and Kakao Map tools for Claude and other MCP clients |
| MCP server, commerce | [korea-commerce-mcp](https://apify.com/magenta_courser/korea-commerce-mcp) | Naver Shopping, Daiso, Olive Young and Ohouse tools |

## Quick start (curl)

One HTTP call runs an Actor and returns the results as JSON:

```bash
curl -X POST "https://api.apify.com/v2/acts/magenta_courser~naver-place-search-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"queries": ["성수 카페"], "maxPlacesPerQuery": 20}'
```

`성수 카페` means "Seongsu cafes". Korean keywords that combine an area and a category work best.

## Examples

- [python/places_and_reviews.py](python/places_and_reviews.py) — search places, then fetch reviews of the top results
- [node/places-and-reviews.mjs](node/places-and-reviews.mjs) — the same flow in Node.js
- [claude/README.md](claude/README.md) — use the data from Claude through MCP
- [chatgpt/README.md](chatgpt/README.md) — build a custom GPT with these Actors as actions
- [blog/how-to-get-naver-map-data.md](blog/how-to-get-naver-map-data.md) — why Naver Map, and a step-by-step walkthrough

## Why not Google Maps?

Google Maps has limited coverage in South Korea. People there use Naver Map and Kakao Map to find, rate and review businesses, so listings, ratings and reviews are far more complete on those two services.

## Notes

- The Actors read publicly visible data only and do not log in. Reviewer names and profiles are not collected.
- Names, addresses and review text are returned in Korean.
- You pay Apify per result; see each Actor's page for the current price.
