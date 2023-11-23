import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { CreateUserInput } from './createUser.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  avatarImage: string;
}
