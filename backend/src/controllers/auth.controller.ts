/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { serialize } from 'cookie';
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
    async loginUser(@Body() userCredentials: UserCredentials, @Res() response: Response): Promise<any> {
        const checkLoginResponse = await this.authService.checkLogin(userCredentials);

        const tempdate = new Date();
        tempdate.setTime(tempdate.getTime() + (119 * 60 * 1000));
        const cookie = `${process.env.JWT_COOKIE_NAME}=${checkLoginResponse.token}; lock=done; expires=${tempdate.toUTCString()}; HttpOnly; Path=/`;
        response.setHeader('Set-Cookie', [cookie]);

        return response.send(checkLoginResponse);
    }

    @Post("/logout")
    async logoutUser(@Res({ passthrough: true }) response: Response): Promise<boolean> {
        response.clearCookie(process.env.JWT_COOKIE_NAME)
        return true;
    }
}
