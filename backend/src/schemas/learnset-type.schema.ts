/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LearnSetTypeDocument = HydratedDocument<LearnSetType>;

@Schema()
export class LearnSetType {

    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    description: string;

}

export const LearnSetTypeSchema = SchemaFactory.createForClass(LearnSetType);