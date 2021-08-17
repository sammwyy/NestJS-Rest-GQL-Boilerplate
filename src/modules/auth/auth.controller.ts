import { Account } from './../account/schemas/account.schema';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import ISession from './interfaces/ISession';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<ISession> {
    return this.authService.login(req['user'] as Account);
  }
}
