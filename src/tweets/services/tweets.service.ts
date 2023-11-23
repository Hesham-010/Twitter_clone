import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetInput } from '../dto/create-tweet.input';
import { UpdateTweetInput } from '../dto/update-tweet.input';
import { Tweets } from '../tables/tweet.table';
import { v4 as uuid } from 'uuid';
import { Users } from 'src/users/tables/users.table';
import DataLoader from 'dataloader';
// import { userLoader } from 'src/utils/dataLoader';

@Injectable()
export class TweetsService {
  constructor(
    @Inject('TWEETS_REPOSITORY') private tweetsRepository: typeof Tweets,
  ) {}

  async create(createTweetInput: CreateTweetInput, context) {
    const tweet = await this.tweetsRepository.create({
      id: uuid(),
      ...createTweetInput,
      userId: context.req.user.id,
    });
    return tweet;
  }

  async findAll(page: number, limit: number) {
    return await Tweets.paginate(page, limit);
  }

  async findTweetsBySpecificUser(userId: string) {
    const tweets = await this.tweetsRepository.findAll({
      where: { userId },
    });
    return tweets;
  }

  async findOne(id: string) {
    const tweet = await this.tweetsRepository.findByPk(id, {
      include: Users,
    });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }
    return tweet;
  }

  async update(updateTweetInput: UpdateTweetInput, id: string) {
    await this.tweetsRepository.update(updateTweetInput, {
      where: { id },
      returning: true,
    });
    return 'Updated';
  }

  async remove(id: string) {
    if (await this.tweetsRepository.destroy({ where: { id } })) {
      return 'Tweet is Deleted';
    }
    throw new NotFoundException('This tweet not found');
  }
}
