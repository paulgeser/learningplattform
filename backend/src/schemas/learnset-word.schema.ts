/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LearnSetWordDocument = HydratedDocument<LearnSetWord>;

@Schema()
export class LearnSetWord {

    @ApiProperty()
    @Prop()
    learnSetId: string;

    @ApiProperty()
    @Prop()
    english: string;

    @ApiProperty()
    @Prop()
    french: string;

    @ApiProperty()
    @Prop()
    malagasy: string;

    @ApiProperty()
    @Prop()
    picture: string;

    @ApiProperty()
    @Prop()
    audio: string;
}

export const LearnSetWordSchema = SchemaFactory.createForClass(LearnSetWord);