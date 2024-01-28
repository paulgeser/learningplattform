/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataService } from './data.service';
import { LearnSet } from 'src/schemas/learnset.schema';
import { LearnSetType } from 'src/schemas/type.enum';
import { LearnSetStatus } from 'src/schemas/status.enum';


@Controller('/data')
@ApiTags("data")
export class DataController {

  constructor(private readonly dataService: DataService) { }

  @Get("/learnset-types")
  getLearnSetTypes(): LearnSetType[] {
    return Object.values(LearnSetType);
  }

  @Get("/learnset-states")
  getLearnSetStates(): LearnSetStatus[] {
    return Object.values(LearnSetStatus);
  }


  @Post("/create-learnset")
  createLearnSet(@Body() learnSet: LearnSet): Promise<LearnSet> {
    return this.dataService.createLearnSet(learnSet);
  }

  @Get("/get-all-learnsets")
  getAllLearnSets(): Promise<LearnSet[]> {
    return this.dataService.getAllLearnSets();
  }

}
