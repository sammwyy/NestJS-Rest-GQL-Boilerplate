import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateAccountDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @Length(8, 256)
  password: string;
}
