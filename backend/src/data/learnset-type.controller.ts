/* eslint-disable prettier/prettier */
import {  Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataService } from './data.service';
import { LearnSetType } from 'src/schemas/learnset-type.schema';
import { LearnsetTypeService } from './learnset-type.service';


@Controller('/data/learnset-type')
@ApiTags("learnset-type")
export class LearnsetTypeDataController {

  constructor(private readonly learnsetTypeService: LearnsetTypeService) { }

  @Get("/")
  getLearnSetTypes(): Promise<LearnSetType[]> {
    return this.learnsetTypeService.getAll();
  }

  @Post("/")
  createLearnSetType(@Body() learnSetType: LearnSetType): Promise<LearnSetType> {
    return this.learnsetTypeService.create(learnSetType);
  }

  @Put("/:id")
  updateLearnSetType(@Param('id') id: string, @Body() learnSetType: LearnSetType): Promise<LearnSetType> {
    return this.learnsetTypeService.update(id, learnSetType);
  }

  @Delete("/:id")
  deleteLearnSetType(@Param('id') id: string): Promise<LearnSetType> {
    return this.learnsetTypeService.delete(id);
  }
}
