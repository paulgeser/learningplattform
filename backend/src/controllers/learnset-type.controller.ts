/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppRole } from 'src/models/app-role.enum';
import { LearnSetType } from 'src/schemas/learnset-type.schema';
import { LearnsetTypeService } from 'src/services/learnset-type.service';


@Controller('/data/learnset-type')
@ApiTags("learnset-type")
export class LearnsetTypeDataController {

  constructor(private readonly learnsetTypeService: LearnsetTypeService) { }

  @Get("/")
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  getLearnSetTypes(): Promise<LearnSetType[]> {
    return this.learnsetTypeService.getAll();
  }

  @Post("/")
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  createLearnSetType(@Body() learnSetType: LearnSetType): Promise<LearnSetType> {
    return this.learnsetTypeService.create(learnSetType);
  }

  @Put("/:id")
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  updateLearnSetType(@Param('id') id: string, @Body() learnSetType: LearnSetType): Promise<LearnSetType> {
    return this.learnsetTypeService.update(id, learnSetType);
  }

  @Delete("/:id")
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  deleteLearnSetType(@Param('id') id: string): Promise<LearnSetType> {
    return this.learnsetTypeService.delete(id);
  }
}
