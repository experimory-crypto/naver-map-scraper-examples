# How to get Naver Map data (places and reviews) without an API key

If you need business data for South Korea, Google Maps will leave gaps. Koreans search, rate and review local businesses on **Naver Map** (also called Naver Place) and **Kakao Map**. A cafe in Seoul with a handful of Google reviews often has thousands of receipt-verified reviews on Naver.

Naver has no public API that returns full place listings or reviews. Its official search API returns only a few results per query. This guide shows a practical way to get the data as JSON with one HTTP call.

## What you can get

- **Places**: name, category, road address, phone, coordinates, rating, visitor review count, blog review count, booking availability, amenities.
- **Reviews**: rating, text, visit date, keyword tags (with English codes such as `coffee_good`), ordered menu item, owner reply. Reviewer names and profiles are not collected.

## Step 1: search places

Use a Korean keyword that combines an area and a category. `성수 카페` means "Seongsu cafes".

```bash
curl -X POST "https://api.apify.com/v2/acts/magenta_courser~naver-place-search-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"queries": ["성수 카페"], "maxPlacesPerQuery": 20}'
```

Each result has an `id`. Naver returns about 300 places per query; to cover a whole city, split it into neighborhoods and remove duplicates by `id`.

## Step 2: get reviews for the places you care about

```bash
curl -X POST "https://api.apify.com/v2/acts/magenta_courser~naver-place-reviews-scraper/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"places": ["1922651675"], "maxReviewsPerPlace": 100}'
```

For monitoring, schedule the run and ask only for reviews newer than your last run.

## Step 3 (optional): add Kakao Map as a second source

[Kakao Map Place Search Scraper](https://apify.com/magenta_courser/kakaomap-place-search-scraper) takes the same input and returns the same field names plus `source`. Match the same business across the two services by phone, address and coordinates, not by name: many businesses share a name.

## Using it from an AI agent

The same data is available to Claude and other MCP clients through the Korea Local Data MCP server. See [../claude/README.md](../claude/README.md).

## Things to know

- Text fields are in Korean. Keyword tags on reviews also come with language-independent codes.
- Hospitals and clinics show no star ratings on Naver; review text and keywords are still available.
- Naver and Kakao ratings come from different reviewers and are not directly comparable.
- Only publicly visible data is read, without logging in.
