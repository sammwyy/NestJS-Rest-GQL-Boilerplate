import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profiles: Model<ProfileDocument>,
  ) {}

  public getByUsername(username: string): Promise<Profile | null> {
    return this.profiles.findOne({ username }).exec();
  }

  public getByID(id: string): Promise<Profile | null> {
    return this.profiles.findOne({ _id: id }).exec();
  }

  public async create(payload: CreateProfileDto): Promise<Profile> {
    if (await this.getByUsername(payload.username)) {
      throw new BadRequestException(
        'USERNAME_ALREADY_IN_USE',
        'This username is already in use.',
      );
    }

    const profile = new this.profiles(payload);
    await profile.save();
    return profile;
  }
}
