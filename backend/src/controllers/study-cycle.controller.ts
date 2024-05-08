/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, SetMetadata, UseGuards, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import mongoose from 'mongoose';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRole } from 'src/models/user/app-role.enum';
import { CreateStudyCycle } from 'src/models/studycycle/create-study-cycle.model';
import { StudyCycle } from 'src/schemas/study-cycle.schema';
import { StudyCycleService } from 'src/services/study-cycle.service';
import { UpdateStudyCycleStatus } from 'src/models/studycycle/update-study-cycle-status.model';
import { StudyCycleWord } from 'src/models/studycycle/study-cycle-word.model';


@Controller('/data/studycycle')
@ApiTags("studycycle")
export class StudyCycleDataController {

  constructor(private studyCycleService: StudyCycleService) { }

  @Post("/")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  createLearnSet(@Body() createStudyCycle: CreateStudyCycle, @Req() request: Request): Promise<StudyCycle> {
    return this.studyCycleService.createStudyCycle(createStudyCycle, (request as any).user.username as string);
  }

  @Get("/user")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  getLearnSetsById(@Req() request: Request): Promise<StudyCycle[]> {
    return this.studyCycleService.getStudyCyclesByUsername((request as any).user.username as string);
  }

  @Put("/:id/status")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  updateStudyCycleStatus(@Param('id') id: string, @Body() updateStudyCycleStatus: UpdateStudyCycleStatus, @Req() request: Request): Promise<mongoose.UpdateWriteOpResult> {
    return this.studyCycleService.updateStudyCycleStatus(id, updateStudyCycleStatus, (request as any).user.username as string);
  }

  @Put("/:id/words")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  async updateStudyCycleWords(@Param('id') id: string, @Body() toBeUpdatedWords: StudyCycleWord[], @Req() request: Request): Promise<mongoose.UpdateWriteOpResult> {
    return this.studyCycleService.updateStudyCycleWords(id, toBeUpdatedWords, (request as any).user.username as string);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  deleteLearnSet(@Param('id') id: string, @Req() request: Request): Promise<mongoose.mongo.DeleteResult> {
    return this.studyCycleService.delete(id, (request as any).user.username as string);
  }
}
