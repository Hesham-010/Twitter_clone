import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TweetsService } from '../services/tweets.service';
import { TweetType } from '../../common/Types/tweet.type';
import { CreateTweetInput } from '../dto/create-tweet.input';
import { UpdateTweetInput } from '../dto/update-tweet.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/utils/enum_roles';
import { TweetPaginationType } from 'src/common/Types/pagination.type';
import { UserDataLoader } from '../dataLoader/dataLoader';

@UseGuards(AuthGuard, RolesGuard)
@Resolver(() => TweetType)
export class TweetsResolver {
  constructor(
    private readonly tweetsService: TweetsService,
    private readonly userDataLoader: UserDataLoader,
  ) {}

  @Mutation(() => TweetType)
  async createTweet(
    @Context() context,
    @Args('createTweetInput') createTweetInput: CreateTweetInput,
  ) {
    return this.tweetsService.create(createTweetInput, context);
  }

  @Roles(Role.Admin)
  @Query(() => TweetPaginationType)
  findAllTweets(@Args('page') page: number, @Args('limit') limit: number) {
    return this.tweetsService.findAll(page, limit);
  }

  @Query(() => TweetType)
  findOneTweet(@Args('id') id: string) {
    return this.tweetsService.findOne(id);
  }

  @Query(() => [TweetType])
  findTweetsBySpecificUser(@Args('userId') userId: string) {
    return this.tweetsService.findTweetsBySpecificUser(userId);
  }

  @Mutation(() => String)
  updateTweet(
    @Args('id') id: string,
    @Args('updateTweetInput')
    updateTweetInput: UpdateTweetInput,
  ) {
    return this.tweetsService.update(updateTweetInput, id);
  }

  @Mutation(() => String)
  removeTweet(@Args('id') id: string) {
    return this.tweetsService.remove(id);
  }

  @ResolveField()
  user(@Parent() tweet) {
    const result = this.userDataLoader.userLoader.load(tweet.userId);
    return result;
  }
}
