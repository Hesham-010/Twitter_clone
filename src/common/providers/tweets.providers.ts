import { Tweets } from '../../tweets/tables/tweet.table';

export const tweetsProviders = [
  {
    provide: 'TWEETS_REPOSITORY',
    useValue: Tweets,
  },
];
