import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, Length } from 'class-validator';

@InputType()
export class GetProfileDto {
  @Field(() => String)
  @IsMongoId()
  id?: string;

  @Field(() => String)
  @Length(1, 32)
  username?: string;
}
