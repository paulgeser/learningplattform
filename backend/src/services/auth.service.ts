/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppUser } from 'src/schemas/app-user.schema';
import { Argon2IdService } from './argon2-id.service';
import { UserCredentials } from 'src/models/auth/user-credentials.model';
import { JwtService } from '@nestjs/jwt';
import { removeAllRestrictedDataFromUser } from 'src/helper/user-helper';
import { CheckLoginResponse } from 'src/models/auth/check-login-response.model';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(AppUser.name) private appUserModel: Model<AppUser>,
        private argon2IdService: Argon2IdService,
        private jwtService: JwtService
    ) { }

    public async checkLogin(userCredentials: UserCredentials): Promise<CheckLoginResponse> {
        const user: AppUser = await this.appUserModel.findOne({ username: userCredentials.username });

        if (!user) {
            throw new UnauthorizedException();
        }

        const result = await this.argon2IdService.comparePasswords(userCredentials.password, user.hashedPassword, user.privateSalt);

        if (result === false) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.username,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.appRole
        };

        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });
        return {
            token: token,
            user: removeAllRestrictedDataFromUser((user))
        }
    }

}
