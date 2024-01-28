/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisController } from './analysis/analysis.controller';
import { AnalysisService } from './analysis/analysis.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnSet, LearnSetSchema } from './schemas/learnset.schema';
import { Word, WordSchema } from './schemas/word.schema';
import { DataService } from './data/data.service';
import { DataController } from './data/data.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LearnSet.name, schema: LearnSetSchema }, { name: Word.name, schema: WordSchema }]),
    MongooseModule.forRoot('mongodb://localhost/learningplattform')
  ],
  controllers: [AppController, AnalysisController, DataController],
  providers: [AppService, AnalysisService, DataService],
})
export class AppModule { }
