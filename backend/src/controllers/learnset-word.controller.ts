/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Word } from 'src/schemas/word.schema';
import { LearnsetWordService } from 'src/services/learnset-word.service';


@Controller('/data/learnset-word')
@ApiTags("learnset-word")
export class LearnsetWordDataController {

  constructor(private readonly learnsetWordService: LearnsetWordService) { }

  @Get("/:id")
  getAllWordsByLearnSetId(@Param('id') id: string): Promise<Word[]> {
    return this.learnsetWordService.getAllByLearnSetId(id);
  }

  @Post("/")
  createWord(@Body() word: Word): Promise<Word> {
    return this.learnsetWordService.create(word);
  }

  @Put("/:id")
  updateWord(@Param('id') id: string, @Body() word: Word): Promise<Word> {
    return this.learnsetWordService.update(id, word);
  }

  @Delete("/:id")
  deleteWord(@Param('id') id: string): Promise<Word> {
    return this.learnsetWordService.delete(id);
  }
}
