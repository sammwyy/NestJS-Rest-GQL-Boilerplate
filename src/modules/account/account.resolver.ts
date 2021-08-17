import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './schemas/account.schema';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => Account)
  async createAccount(
    @Args('payload') payload: CreateAccountDto,
  ): Promise<Account> {
    return await this.accountService.create(payload);
  }
}
