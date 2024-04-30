/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppRole } from 'src/models/app-role.enum';
import { UserCredentials } from 'src/models/user-credentials.model';
import { AuthService } from 'src/services/auth.service';


@Controller('/auth')
@ApiTags("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Get("/check-login")
    @UseGuards(AuthGuard)
    @SetMetadata('roles', [AppRole.ADMIN, AppRole.TEACHER, AppRole.STUDENT])
    async checkLoginStatus(): Promise<boolean> {
        return true;
    }

    @Post("/login")
    async loginUser(@Body() userCredentials: UserCredentials, @Res({ passthrough: true }) response: Response): Promise<boolean> {
        const jwtToken = await this.authService.checkLogin(userCredentials);
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
}
