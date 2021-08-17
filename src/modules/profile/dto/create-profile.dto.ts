import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProfileDto {
  @Field(() => String)
  username: string;

  @Field(() => String)
  displayName?: string;

  @Field(() => String)
  bio?: string;
}
