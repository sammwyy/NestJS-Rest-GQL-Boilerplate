import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Profile {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  displayName: string;

  @Field()
  @Prop()
  username: string;

  @Field({ nullable: true })
  bio?: string;
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
