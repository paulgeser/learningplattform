/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUser } from 'src/models/create-user.model';
import { UserCredentials } from 'src/models/user-credentials.model';
import { AppUser } from 'src/schemas/app-user.schema';
import { LearnSetWord } from 'src/schemas/learnset-word.schema';
import { AppUserService } from 'src/services/app-user.service';
import { LearnsetWordService } from 'src/services/learnset-word.service';


@Controller('/data/app-user')
@ApiTags("app-user")
export class AppUserDataController {

    constructor(private readonly appUserService: AppUserService) { }

    @Get("/")
    getAllUsers(): Promise<AppUser[]> {
        return this.appUserService.getAllUsers();
    }

    @Get("/:username")
    getUserByUsername(@Param('username') username: string): Promise<AppUser> {
        return this.appUserService.getUserByUsername(username);
    }

    @Post("/")
    createUser(@Body() createUser: CreateUser): Promise<AppUser> {
        return this.appUserService.create(createUser);
    }

    @Post("/login")
    loginUser(@Body() userCredentials: UserCredentials): Promise<boolean> {
        return this.appUserService.checkLogin(userCredentials);
    }

    @Put("/:username")
    updateUser(@Param('username') username: string, @Body() appUser: AppUser): Promise<AppUser> {
        return this.appUserService.update(username, appUser);
    }

    @Delete("/:username")
    deleteUser(@Param('username') username: string): Promise<AppUser> {
        return this.appUserService.delete(username);
    }
}
