import { Module } from '@nestjs/common';
import { FollowService } from './services/follow.service';
import { FollowResolver } from './resolvers/follow.resolver';
import { followProviders } from '../common/providers/follow.providers';
import { usersProviders } from 'src/common/providers/users.providers';

@Module({
  providers: [FollowResolver, FollowService, ...followProviders],
})
export class FollowModule {}
