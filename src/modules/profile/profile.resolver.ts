import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProfileDto } from './dto/create-profile.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('payload') payload: CreateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.create(payload);
  }

  @Query(() => Profile)
  async getProfileByUsername(
    @Args('username') username: string,
  ): Promise<Profile> {
    const user = await this.profileService.getByUsername(username);

    if (!user) {
      throw new NotFoundException(
        'User with this username not exist.',
        'USERNAME_NOT_FOUND',
      );
    } else {
      return user;
    }
  }
}
