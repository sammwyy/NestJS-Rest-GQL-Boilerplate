import { AccountResolver } from './account.resolver';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './schemas/account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [AccountResolver, AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
