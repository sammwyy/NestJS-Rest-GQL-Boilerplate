import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AuthLoginDto {
  @Field(() => String)
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
