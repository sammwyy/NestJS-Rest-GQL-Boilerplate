import { AuthLoginDto } from './dto/auth-login.dto';
import { AccountService } from './../account/account.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../account/schemas/account.schema';
import ISession from './interfaces/ISession';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  public async validate(
    email: string,
    password: string,
  ): Promise<Account | null> {
    const account = await this.accountService.getByEmail(email);
    if (!account) {
      throw new NotFoundException(
        "This email isn't registered.",
        'EMAIL_NOT_REGISTERED',
      );
    }

    if (await account.comparePassword(password)) {
      return account;
    } else {
      throw new UnauthorizedException(
        "Password didn't match",
        'WRONG_PASSWORD',
      );
    }
  }

  public login(account: Account): ISession {
    const payload = {
      id: account._id,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      accessToken,
      account,
    };
  }

  public async createSession(payload: AuthLoginDto): Promise<ISession> {
    const account = await this.validate(payload.email, payload.password);
    return this.login(account);
  }
}
