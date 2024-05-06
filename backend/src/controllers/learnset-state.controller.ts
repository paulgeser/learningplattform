/* eslint-disable prettier/prettier */
import {  Body, Controller, Get, SetMetadata, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppRole } from 'src/models/app-role.enum';
import { LearnSetStatus } from 'src/models/status.enum';


@Controller('/data/learnset-state')
@ApiTags("learnset-state")
export class LearnsetStateDataController {

  constructor() { }

  @Get("/")
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  getLearnSetStates(): LearnSetStatus[] {
    return Object.values(LearnSetStatus);
  }



}
