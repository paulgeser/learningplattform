/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRole } from 'src/models/app-role.enum';
import { CreateUser } from 'src/models/create-user.model';
import { AppUser } from 'src/schemas/app-user.schema';
import { AppUserService } from 'src/services/app-user.service';


@Controller('/data/app-user')
@ApiTags("app-user")
export class AppUserDataController {

    constructor(private readonly appUserService: AppUserService) { }

    @Get("/")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER])
    getAllUsers(): Promise<AppUser[]> {
        return this.appUserService.getAllUsers();
    }

    @Get("/:username")
    @SetMetadata('roles', [AppRole.ADMIN])
    getUserByUsername(@Param('username') username: string): Promise<AppUser> {
        return this.appUserService.getUserByUsername(username);
    }

    @Post("/")
    @SetMetadata('roles', [AppRole.ADMIN])
    createUser(@Body() createUser: CreateUser): Promise<AppUser> {
        return this.appUserService.create(createUser);
    }

    @Put("/:username")
    @SetMetadata('roles', [AppRole.ADMIN])
    updateUser(@Param('username') username: string, @Body() appUser: AppUser): Promise<AppUser> {
        return this.appUserService.update(username, appUser);
    }

    @Delete("/:username")
    @SetMetadata('roles', [AppRole.ADMIN])
    deleteUser(@Param('username') username: string): Promise<AppUser> {
        return this.appUserService.delete(username);
    }
}
