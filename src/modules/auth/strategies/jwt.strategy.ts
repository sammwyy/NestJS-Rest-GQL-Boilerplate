import { AccountService } from './../../account/account.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(validationPayload: { id: string }, done: any) {
    const user = this.accountService.getByID(validationPayload.id);
    if (user) {
      done(null, user);
    } else {
      done(
        new NotFoundException(
          'This user not longer exist.',
          'USER_NOT_LONGER_EXIST',
        ),
        null,
      );
    }
  }
}
