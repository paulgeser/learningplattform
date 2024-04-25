/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LearnSet } from 'src/schemas/learnset.schema';
import { LearnsetService } from 'src/services/learnset.service';


@Controller('/data/learnset')
@ApiTags("learnset")
export class LearnsetDataController {

  constructor(private learnsetService: LearnsetService) { }

  @Get("/")
  getLearnSets(): Promise<LearnSet[]> {
    return this.learnsetService.getAll();
  }

  @Post("/")
  createLearnSet(@Body() learnSet: LearnSet): Promise<LearnSet> {
    return this.learnsetService.createLearnSet(learnSet);
  }

  @Put("/:id")
  updateLearnSet(@Param('id') id: string, @Body() learnSet: LearnSet): Promise<LearnSet> {
    return this.learnsetService.updateLearnSet(id, learnSet);
  }

  @Delete("/:id")
  deleteLearnSet(@Param('id') id: string): Promise<LearnSet> {
    return this.learnsetService.delete(id);
  }
}
