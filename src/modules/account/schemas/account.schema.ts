import { Profile } from '../../profile/schemas/profile.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Account {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => Profile)
  @Prop({ type: Types.ObjectId, ref: Profile.name })
  profile?: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  emailVerified: boolean;

  comparePassword: (passwordCandidate: string) => Promise<boolean>;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
