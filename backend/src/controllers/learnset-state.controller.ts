/* eslint-disable prettier/prettier */
import {  Body, Controller, Get, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LearnSetStatus } from 'src/models/status.enum';


@Controller('/data/learnset-state')
@ApiTags("learnset-state")
export class LearnsetStateDataController {

  constructor() { }

  @Get("/")
  getLearnSetStates(): LearnSetStatus[] {
    return Object.values(LearnSetStatus);
  }



}
