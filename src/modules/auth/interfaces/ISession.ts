import { Field, ObjectType } from '@nestjs/graphql';
import { Account } from '../../account/schemas/account.schema';

@ObjectType()
export default class ISession {
  @Field()
  account: Account;

  @Field()
  accessToken: string;
}
