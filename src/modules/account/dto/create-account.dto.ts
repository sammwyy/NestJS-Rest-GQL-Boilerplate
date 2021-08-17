import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
