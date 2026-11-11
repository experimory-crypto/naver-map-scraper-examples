# Build a custom GPT with Korean local data

Give a custom GPT live Naver Map and Kakao Map data by adding the Apify API as an action.

1. In ChatGPT, create a GPT and open **Configure → Actions → Create new action**.
2. Paste [openapi.yaml](openapi.yaml) as the schema.
3. Set **Authentication** to **API Key**, type **Bearer**, and paste your Apify API token.
4. Paste [instructions.md](instructions.md) into the GPT's instructions.

Each user of a shared GPT runs the actions on the token you configured, so the usage is billed to your Apify account. For a GPT you plan to share widely, set a spending limit in Apify first.

Calls use Apify's synchronous endpoint, which waits for the Actor to finish. Keep result counts small (the instructions cap them) so each call returns within the action timeout.
