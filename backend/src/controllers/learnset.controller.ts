/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, SetMetadata, UseGuards, } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRole } from 'src/models/user/app-role.enum';
import { LearnSet } from 'src/schemas/learnset.schema';
import { LearnsetService } from 'src/services/learnset.service';


@Controller('/data/learnset')
@ApiTags("learnset")
export class LearnsetDataController {

  constructor(private learnsetService: LearnsetService) { }

  @Get("/")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  @ApiQuery({ name: "name", type: String, required: false })
  @ApiQuery({ name: "learnset-type", type: Array<String>, required: false })
  @ApiQuery({ name: "week", type: Array<String>, required: false })
  getLearnSets(
    @Query('name') nameQuery: string,
    @Query('learnset-type') learnsetTypeIds: string[],
    @Query('week') weeks: string[]
  ): Promise<LearnSet[]> {
    return this.learnsetService.getAll(nameQuery, learnsetTypeIds, weeks);
  }

  @Get("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  getLearnSetsById(@Param('id') id: string): Promise<LearnSet> {
    return this.learnsetService.getLearnSetById(id);
  }

  @Post("/")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  createLearnSet(@Body() learnSet: LearnSet): Promise<LearnSet> {
    return this.learnsetService.createLearnSet(learnSet);
  }

  @Put("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  updateLearnSet(@Param('id') id: string, @Body() learnSet: LearnSet): Promise<LearnSet> {
    return this.learnsetService.updateLearnSet(id, learnSet);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  deleteLearnSet(@Param('id') id: string): Promise<LearnSet> {
    return this.learnsetService.delete(id);
  }
}
