/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LearnSetStatus } from './status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { LearnSetType } from './learnset-type.schema';

export type LearnSetDocument = HydratedDocument<LearnSet>;

@Schema()
export class LearnSet {

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'LearnSetType'})
  type: LearnSetType;

  @ApiProperty()
  @Prop()
  week: number;

  @ApiProperty()
  @Prop({ type: String, enum: LearnSetStatus })
  status: LearnSetStatus;
}

export const LearnSetSchema = SchemaFactory.createForClass(LearnSet);