import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowType {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  followerId: string;

  @Field((type) => ID)
  followingId: string;
}
