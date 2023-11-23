import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @Length(11)
  @IsMobilePhone()
  phone: string;

  @Field()
  @IsString()
  role: string;
}
