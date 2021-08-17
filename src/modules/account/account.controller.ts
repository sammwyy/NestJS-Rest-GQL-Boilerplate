import { AccountService } from './account.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() payload: CreateAccountDto) {
    return this.accountService.create(payload);
  }
}
