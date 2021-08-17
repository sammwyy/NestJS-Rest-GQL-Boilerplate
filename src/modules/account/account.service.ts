import { CreateAccountDto } from './dto/create-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accounts: Model<AccountDocument>,
  ) {}

  public getByEmail(email: string): Promise<Account | null> {
    return this.accounts.findOne({ email }).exec();
  }

  public getByID(id: string): Promise<Account | null> {
    return this.accounts.findOne({ _id: id }).exec();
  }

  public async create(payload: CreateAccountDto): Promise<Account> {
    if (await this.getByEmail(payload.email)) {
      throw new BadRequestException(
        'EMAIL_ALREADY_IN_USE',
        'This email is already in use.',
      );
    }

    const account = new this.accounts(payload);
    await account.save();
    return account;
  }
}
