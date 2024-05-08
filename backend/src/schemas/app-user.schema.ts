/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AppRole } from 'src/models/user/app-role.enum';
import { LearnSetStudyLanguage } from 'src/models/learnset/learnset-study-language.enum';

export type AppUserDocument = HydratedDocument<AppUser>;

@Schema()
export class AppUser {

  @ApiProperty()
  @Prop({ type: String, unique: true })
  username: string;

  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  phone: string;

  @ApiProperty()
  @Prop({ type: String, enum: LearnSetStudyLanguage })
  studyLanguage: LearnSetStudyLanguage;

  @ApiProperty()
  @Prop({ type: String, enum: AppRole })
  appRole: AppRole;

  @ApiProperty()
  @Prop()
  hashedPassword: string;

  @ApiProperty()
  @Prop()
  privateSalt: string;

  @ApiProperty()
  @Prop()
  active: boolean;

}

export const AppUserSchema = SchemaFactory.createForClass(AppUser);