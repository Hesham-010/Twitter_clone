import { Inject, Injectable } from '@nestjs/common';
import { Follow } from '../tables/follow.table';
import { v4 as uuid } from 'uuid';
import { FilterFollowInput } from '../dto/filter-follow.input';
import { Users } from 'src/users/tables/users.table';

@Injectable()
export class FollowService {
  constructor(
    @Inject('FOLLOW_REPOSITORY') private followRepository: typeof Follow,
  ) {}

  async createFollowOrDelete(context, followingId) {
    const follow = await this.followRepository.findOne({
      where: {
        followerId: context.req.user.id,
        followingId: followingId,
      },
    });
    if (!follow) {
      const newFollow = await this.followRepository.create({
        id: uuid(),
        followerId: context.req.user.id,
        followingId: followingId,
      });
      return 'Follow Created';
    } else {
      await this.followRepository.destroy({ where: { id: follow.id } });
      return 'Follow Removed';
    }
  }

  async findAll() {
    const follows = await this.followRepository.findAll();
    return follows;
  }

  async findFollowerOrFollowings(filterFollowInput) {
    let filter;
    if (filterFollowInput.followerId) {
      filter = { followerId: filterFollowInput.followerId };
    }
    if (filterFollowInput.followingId) {
      filter = { followingId: filterFollowInput.followingId };
    }
    const follows = await this.followRepository.findAll({
      where: filter,
    });
    return follows;
  }
}
