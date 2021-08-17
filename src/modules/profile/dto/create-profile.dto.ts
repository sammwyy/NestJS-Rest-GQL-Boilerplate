import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateProfileDto {
  @Field(() => String)
  @Length(1, 32)
  username: string;

  @Field(() => String)
  @Length(1, 64)
  displayName?: string;

  @Field(() => String)
  @Length(0, 256)
  bio?: string;
}
