/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRole } from 'src/models/app-role.enum';
import { LearnSetWord } from 'src/schemas/learnset-word.schema';
import { LearnsetWordService } from 'src/services/learnset-word.service';


@Controller('/data/learnset-word')
@ApiTags("learnset-word")
export class LearnsetWordDataController {

  constructor(private readonly learnsetWordService: LearnsetWordService) { }

  @Get("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
  getAllWordsByLearnSetId(@Param('id') id: string): Promise<LearnSetWord[]> {
    return this.learnsetWordService.getAllByLearnSetId(id);
  }

  @Post("/")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  createWord(@Body() learnSetWord: LearnSetWord): Promise<LearnSetWord> {
    return this.learnsetWordService.create(learnSetWord);
  }

  @Put("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  updateWord(@Param('id') id: string, @Body() learnSetWord: LearnSetWord): Promise<LearnSetWord> {
    return this.learnsetWordService.update(id, learnSetWord);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
  deleteWord(@Param('id') id: string): Promise<LearnSetWord> {
    return this.learnsetWordService.delete(id);
  }
}
