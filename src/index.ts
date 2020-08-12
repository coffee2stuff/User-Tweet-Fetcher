import * as axios from 'axios';
import { BearerTokenModel, TweetModel } from './models';

export class UserTweetFetcher {
    private readonly apiKey: string;
    private readonly apiSecret: string;

    private bearerToken = '';

    constructor(key: string, secret: string) {
        this.apiKey = key;
        this.apiSecret = secret;
    }

    async generateBearerToken(): Promise<void> {
        const data = 'grant_type=client_credentials';
        const axiosConfig: axios.AxiosRequestConfig = {
            method: 'post',
            url: 'https://api.twitter.com/oauth2/token',
            auth: {
                username: this.apiKey,
                password: this.apiSecret
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        const response: axios.AxiosResponse<BearerTokenModel> = await axios.default(axiosConfig);
        this.bearerToken = response.data.access_token;
    }

    async fetchUserTweets(handle: string, first: number): Promise<Array<TweetModel>> {
        const axiosConfig: axios.AxiosRequestConfig = {
            method: 'get',
            url: `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${handle}&count=${first}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.bearerToken}`
            }
        };
        const response: axios.AxiosResponse<any> = await axios.default(axiosConfig);
        return response.data.map((tweet: any) => {
            return {
                id: tweet['id'],
                timestamp: tweet['created_at'],
                author: tweet['user']['name'],
                screenName: tweet['user']['screen_name'],
                text: tweet['text']
            } as TweetModel;
        });
    }
}
