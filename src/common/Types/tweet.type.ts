import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UsersType } from './users.types';

@ObjectType()
export class TweetType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  tweetImage: string;

  @Field(() => UsersType, { nullable: true })
  user: UsersType;
}
