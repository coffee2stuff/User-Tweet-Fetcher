import { UserTweetFetcher } from '../src';

describe('library test', () => {
    it('should fetch first 15 tweets', async () => {
        const apiKey = 'XXX';
        const apiSecret = 'XXX';
        const twitterHandle = 'XXX';
        const first = 0;

        const fetcher = new UserTweetFetcher(apiKey, apiSecret);
        await fetcher.generateBearerToken();
        const tweets = await fetcher.fetchUserTweets(twitterHandle, first);
        console.log(tweets);
        expect(tweets).toHaveLength(first);
    });
});
