import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { FollowService } from '../services/follow.service';
import { FollowType } from '../../common/Types/follow.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FilterFollowInput } from '../dto/filter-follow.input';

@UseGuards(AuthGuard)
@Resolver((of) => FollowType)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => String)
  createFollowOrDelete(
    @Context() context,
    @Args('followingId') followingId: string,
  ) {
    return this.followService.createFollowOrDelete(context, followingId);
  }

  @Query(() => [FollowType])
  findAllFollows() {
    return this.followService.findAll();
  }

  @Query(() => [FollowType])
  findFollowerOrFollowings(
    @Args('filterFollowInput') filterFollowInput: FilterFollowInput,
  ) {
    return this.followService.findFollowerOrFollowings(filterFollowInput);
  }
}
