import { GetProfileDto } from './dto/get-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  createProfile(@Body() payload: CreateProfileDto) {
    return this.profileService.create(payload);
  }

  @Get()
  async getProfile(@Query() payload: GetProfileDto) {
    const { id, username } = payload;
    let profile = null;

    if (username) {
      profile = await this.profileService.getByUsername(username);
    } else if (id) {
      profile = await this.profileService.getByID(id);
    }

    if (profile) {
      return profile;
    } else {
      throw new NotFoundException(
        'User with this ID or username not found.',
        'USER_NOT_FOUND',
      );
    }
  }
}
