# Use Korean local data from Claude (MCP)

Two ways to give Claude live Naver Map and Kakao Map data.

## Option 1: [Korea Local Data MCP Server](https://apify.com/magenta_courser/korea-local-data-mcp)

A small MCP server with three tools: `search_naver_places`, `get_naver_place_reviews`, `search_kakao_places`.

Endpoint (Streamable HTTP), authenticated with your Apify API token:

```
https://magenta-courser--korea-local-data-mcp.apify.actor/mcp
```

Claude Code:

```bash
claude mcp add --transport http korea-local-data https://magenta-courser--korea-local-data-mcp.apify.actor/mcp --header "Authorization: Bearer YOUR_APIFY_TOKEN"
```

Then ask, for example: "Find the top 20 cafes in Seongsu on Naver Map and summarize what reviewers say about the top 3."

## Option 2: Apify's own MCP server (one-click sign-in)

Apify is listed in Claude's connector directory. Add the **Apify** connector in Claude (Settings → Connectors) and sign in with your Apify account; no token to copy.

To load specific Actors as tools, add a custom connector with the Actors in the URL:

```
https://mcp.apify.com?tools=magenta_courser/naver-place-search-scraper,magenta_courser/naver-place-reviews-scraper,magenta_courser/kakaomap-place-search-scraper
```

Then ask, for example: "List dermatology clinics near Gangnam Station from Naver Map." With the general connector, mention the Actor by name for reliable selection, e.g. "Use magenta_courser/naver-place-search-scraper to ...".

## Shopping and beauty data

[Korea Commerce MCP Server](https://apify.com/magenta_courser/korea-commerce-mcp) offers Naver Shopping search, Daiso and Olive Young rankings, Ohouse products and Korean furniture price comparison as MCP tools:

```
https://magenta-courser--korea-commerce-mcp.apify.actor/mcp
```

## Which one?

- Quick lookups inside a conversation (up to 100 items per call): Option 1.
- Large exports, schedules, Olive Young and Naver Shopping data: Option 2 or the Apify API directly.
