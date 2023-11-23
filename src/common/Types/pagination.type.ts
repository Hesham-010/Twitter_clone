import { ObjectType, Field } from '@nestjs/graphql';
import { UsersType } from './users.types';
import { TweetType } from './tweet.type';

@ObjectType('PageInfo')
export class PageInfoType {
  @Field()
  hasNext: boolean;

  @Field()
  hasBefore: boolean;

  @Field()
  page: number;

  @Field()
  totalCount: number;

  @Field()
  totalPages: number;

  @Field()
  limit: number;
}

@ObjectType('UsersPagination')
export class UsersPaginationType {
  @Field(() => [UsersType])
  items?: [UsersType];

  @Field()
  pageInfo: PageInfoType;
}

@ObjectType('TweetPagination')
export class TweetPaginationType {
  @Field(() => [TweetType])
  items?: [TweetType];

  @Field()
  pageInfo: PageInfoType;
}
