/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { removeAllRestrictedDataFromUser } from 'src/helper/user-helper';
import { AppRole } from 'src/models/app-role.enum';
import { BasicUser } from 'src/models/basic-user.model';
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
    getAllUsers(): Promise<BasicUser[]> {
        return this.appUserService.getAllUsers();
    }

    @Get("/:username")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN])
    getUserByUsername(@Param('username') username: string): Promise<AppUser> {
        return this.appUserService.getUserByUsername(username);
    }

    @Post("/")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN])
    async createUser(@Body() createUser: CreateUser): Promise<BasicUser> {
        return removeAllRestrictedDataFromUser(await this.appUserService.create(createUser));
    }

    @Put("/:username")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN])
    updateUser(@Param('username') username: string, @Body() basicUser: BasicUser): Promise<BasicUser> {
        return this.appUserService.update(username, basicUser);
    }

    @Delete("/:username")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN])
    deleteUser(@Param('username') username: string): Promise<AppUser> {
        return this.appUserService.delete(username);
    }
}
