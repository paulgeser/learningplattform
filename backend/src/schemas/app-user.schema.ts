/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AppRole } from 'src/models/app-role.enum';
import { StudyLanguage } from 'src/models/study-language.enum';

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
  @Prop({ type: String, enum: StudyLanguage })
  studyLanguage: StudyLanguage;

  @ApiProperty()
  @Prop({ type: String, enum: AppRole })
  appRole: AppRole;

  @ApiProperty()
  @Prop()
  hashedPassword: string;

  @ApiProperty()
  @Prop()
  privateSalt: string;

}

export const AppUserSchema = SchemaFactory.createForClass(AppUser);