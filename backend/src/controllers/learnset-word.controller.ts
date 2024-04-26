/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LearnSetWord } from 'src/schemas/learnset-word.schema';
import { LearnsetWordService } from 'src/services/learnset-word.service';


@Controller('/data/learnset-word')
@ApiTags("learnset-word")
export class LearnsetWordDataController {

  constructor(private readonly learnsetWordService: LearnsetWordService) { }

  @Get("/:id")
  getAllWordsByLearnSetId(@Param('id') id: string): Promise<LearnSetWord[]> {
    return this.learnsetWordService.getAllByLearnSetId(id);
  }

  @Post("/")
  createWord(@Body() learnSetWord: LearnSetWord): Promise<LearnSetWord> {
    return this.learnsetWordService.create(learnSetWord);
  }

  @Put("/:id")
  updateWord(@Param('id') id: string, @Body() learnSetWord: LearnSetWord): Promise<LearnSetWord> {
    return this.learnsetWordService.update(id, learnSetWord);
  }

  @Delete("/:id")
  deleteWord(@Param('id') id: string): Promise<LearnSetWord> {
    return this.learnsetWordService.delete(id);
  }
}
