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
import { LearnSetType, LearnSetTypeSchema } from './schemas/learnset-type.schema';
import { LearnsetTypeDataController } from './controllers/learnset-type.controller';
import { LearnsetTypeService } from './services/learnset-type.service';
import { LearnsetStateDataController } from './controllers/learnset-state.controller';
import { LearnsetDataController } from './controllers/learnset.controller';
import { LearnsetService } from './services/learnset.service';
import { LearnsetWordService } from './services/learnset-word.service';
import { LearnsetWordDataController } from './controllers/learnset-word.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LearnSet.name, schema: LearnSetSchema }, { name: LearnSetType.name, schema: LearnSetTypeSchema }, , { name: Word.name, schema: WordSchema }]),
    MongooseModule.forRoot('mongodb://localhost/learningplattform')
  ],
  controllers: [AppController, AnalysisController, DataController, LearnsetTypeDataController, LearnsetStateDataController, LearnsetDataController, LearnsetWordDataController],
  providers: [AppService, AnalysisService, DataService, LearnsetTypeService, LearnsetService, LearnsetWordService],
})
export class AppModule { }
