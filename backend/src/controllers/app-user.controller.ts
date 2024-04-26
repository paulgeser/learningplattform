/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRole } from 'src/models/app-role.enum';
import { CreateUser } from 'src/models/create-user.model';
import { UserCredentials } from 'src/models/user-credentials.model';
import { AppUser } from 'src/schemas/app-user.schema';
import { AppUserService } from 'src/services/app-user.service';


@Controller('/data/app-user')
@ApiTags("app-user")
export class AppUserDataController {

    constructor(private readonly appUserService: AppUserService) { }

    @Get("/")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
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
    async loginUser(@Body() userCredentials: UserCredentials, @Res({ passthrough: true }) response: Response): Promise<boolean> {
        const jwtToken = await this.appUserService.checkLogin(userCredentials);
        response.cookie(process.env.JWT_COOKIE_NAME, jwtToken, {
            secure: true,
            httpOnly: true
        });
        return true;
    }

    @Post("/logout")
    async logoutUser(@Res({ passthrough: true }) response: Response): Promise<boolean> {
        response.clearCookie(process.env.JWT_COOKIE_NAME)
        return true;
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
