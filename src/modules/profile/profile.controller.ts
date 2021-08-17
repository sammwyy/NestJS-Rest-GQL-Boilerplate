import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  createProfile(@Body() payload: CreateProfileDto) {
    return this.profileService.create(payload);
  }
}
