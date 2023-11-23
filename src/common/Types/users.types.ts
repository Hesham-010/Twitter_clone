import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UsersType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  role: string;

  @Field()
  createsAt: string;

  @Field()
  updatedAt: string;
}
