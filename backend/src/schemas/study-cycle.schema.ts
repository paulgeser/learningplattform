/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LearnSetStatus } from '../models/learnset/learnset-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { LearnSetType } from './learnset-type.schema';
import { StudyCycleStatus } from 'src/models/studycycle/study-cycle-status.enum';
import { StudyCycleWord } from 'src/models/studycycle/study-cycle-word.model';
import { StudyCycleType } from 'src/models/studycycle/study-cycle-type.enum';

export type StudyCycleDocument = HydratedDocument<StudyCycle>;

@Schema()
export class StudyCycle {

  @ApiProperty()
  @Prop()
  learnSetIds: string[];

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop({ type: String, enum: StudyCycleStatus })
  learnStatus: StudyCycleStatus;

  @ApiProperty()
  @Prop({ type: String, enum: StudyCycleType })
  studyCycleType: StudyCycleType;

  @ApiProperty()
  @Prop()
  learnSetWords: StudyCycleWord[];

  @ApiProperty()
  @Prop()
  dateCreated: Date;

  @ApiProperty()
  @Prop()
  dateFinished: Date | null;
}

export const StudyCycleSchema = SchemaFactory.createForClass(StudyCycle);