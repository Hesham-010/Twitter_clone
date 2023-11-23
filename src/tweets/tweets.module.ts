import { Module } from '@nestjs/common';
import { TweetsService } from './services/tweets.service';
import { TweetsResolver } from './resolvers/tweets.resolver';
import { tweetsProviders } from '../common/providers/tweets.providers';
import { usersProviders } from 'src/common/providers/users.providers';
import { UserDataLoader } from './dataLoader/dataLoader';

@Module({
  providers: [
    TweetsResolver,
    TweetsService,
    ...tweetsProviders,
    ...usersProviders,
    UserDataLoader,
  ],
})
export class TweetsModule {}
