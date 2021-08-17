import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import ISession from './interfaces/ISession';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ISession)
  public async login(
    @Args('payload') payload: AuthLoginDto,
  ): Promise<ISession> {
    return await this.authService.createSession(payload);
  }
}
