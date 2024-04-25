/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataService } from './data.service';
import { LearnSet } from 'src/schemas/learnset.schema';
import { LearnSetStatus } from 'src/schemas/status.enum';
import { AnalyzedWordsModel } from 'src/schemas/analyzed-words.model';
import { Word } from 'src/schemas/word.schema';
import { ImageWordInputModel } from 'src/schemas/image-word-input.model';
import { StatusInputModel } from 'src/schemas/status-input.model';


@Controller('/data')
@ApiTags("data")
export class DataController {

  constructor(private readonly dataService: DataService) { }
/* 
  @Post("/create-learnset")
  createLearnSet(@Body() learnSet: LearnSet): Promise<LearnSet> {
    return this.dataService.createLearnSet(learnSet);
  }

  @Get("/get-all-learnsets")
  getAllLearnSets(): Promise<LearnSet[]> {
    return this.dataService.getAllLearnSets();
  }

  @Get('/learnset/:id')
  getLearnSetById(@Param('id') id: string): Promise<LearnSet> {
    return this.dataService.getLearnSetById(id);
  }

  @Post('/learnset/:id/text')
  async addTextToLearnSet(@Param('id') id: string, @Body() analyzedWords: AnalyzedWordsModel[]): Promise<Word[]> {
    return await this.dataService.addWordsToLearnSet(id, analyzedWords);
  }

  @Get('/learnset/:id/words')
  getWordsByLearnSetId(@Param('id') id: string): Promise<Word[]> {
    return this.dataService.getWordsByLearnSetId(id);
  }

  @Post('/learnset/picture')
  async addPictureToWord(@Body() inputPicture: ImageWordInputModel): Promise<boolean> {
    return await this.dataService.addPictureToWord(inputPicture);
  }

  @Post('/learnset/:id/status')
  async updateStatusOfLearnSet(@Param('id') id: string, @Body() inputStatus: StatusInputModel): Promise<boolean> {
    return await this.dataService.updateStatusOfLearnSet(id, LearnSetStatus[inputStatus.status]);
  }
 */
}
