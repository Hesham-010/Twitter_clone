import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @Field()
  password: string;

  @MinLength(11)
  @IsNotEmpty()
  @Field()
  phone: string;

  @IsOptional()
  @Field()
  role: string;
}
