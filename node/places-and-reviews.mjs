// Search Naver Map places, then fetch visitor reviews of the top results.
// Usage: APIFY_TOKEN=... node places-and-reviews.mjs "성수 카페"   (Node.js 18+)

const run = async (actor, input) => {
    const response = await fetch(`https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.APIFY_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error(`${actor}: HTTP ${response.status} ${await response.text()}`);
    return response.json();
};

const query = process.argv[2] ?? '성수 카페';

const places = await run('magenta_courser~naver-place-search-scraper', { queries: [query], maxPlacesPerQuery: 10 });
for (const place of places) {
    console.log(place.rank, place.name, place.visitorReviewScore, place.visitorReviewCount, place.roadAddress);
}

const rows = await run('magenta_courser~naver-place-reviews-scraper', {
    places: places.slice(0, 3).map((place) => place.id),
    maxReviewsPerPlace: 20,
    includePlaceSummary: false,
});
for (const row of rows) {
    console.log(row.placeName, row.rating, (row.text ?? '').slice(0, 60));
}
