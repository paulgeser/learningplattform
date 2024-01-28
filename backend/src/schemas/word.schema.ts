/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {

    @ApiProperty()
    @Prop()
    learnSetId: string;

    @ApiProperty()
    @Prop()
    english: string;

    @ApiProperty()
    @Prop()
    malagasy: string;

    @ApiProperty()
    @Prop()
    picture: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);