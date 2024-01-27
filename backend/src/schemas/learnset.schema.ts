/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LearnSetStatus } from './status.enum';
import { LearnSetType } from './type.enum';
import { ApiProperty } from '@nestjs/swagger';

export type LearnSetDocument = HydratedDocument<LearnSet>;

@Schema()
export class LearnSet {

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ type: String, enum: LearnSetType })
  type: LearnSetType;

  @ApiProperty()
  @Prop()
  week: number;

  @ApiProperty()
  @Prop({ type: String, enum: LearnSetStatus })
  status: LearnSetStatus;
}

export const LearnSetSchema = SchemaFactory.createForClass(LearnSet);