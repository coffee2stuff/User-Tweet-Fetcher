# User Tweet Fetcher

Utility application that browses for user's tweets.

## Usage

Install the necessary dependencies with `npm install`.

From your Twitter Developer console, create a new application and copy/paste consumer API keys, this is, `API key` and `API secret key`. These two will be used to obtain a Bearer Token by creating a request to `/oauth2/token` endpoint.

Sample usage:

```ts
// Create an instance of UserTweetFetcher by providing the API key
// and the API secret key
const fetcher = new UserTweetFetcher('your API key', 'your API secret key');

// Generates a Bearer Token that you'll need in subsequent requests
await fetcher.generateBearerToken();

// Fetch user tweets: provide screen name and first [n] Tweets that
// you would like to receive from the user
const tweets = await fetcher.fetchUserTweets('peteralexbizjak', 150);
```

If you want to run tests with `npm test`, you can do so, but you'll need to provide the API key, secret, screen name and first `[n]` amount of tweets that you'd like to fetch.
