/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppUser } from 'src/schemas/app-user.schema';
import { Argon2IdService } from './argon2-id.service';
import { CreateUser } from 'src/models/create-user.model';
import { UserCredentials } from 'src/models/user-credentials.model';
import { JwtService } from '@nestjs/jwt';
import { removeAllRestrictedDataFromUser } from 'src/helper/user-helper';
import { BasicUser } from 'src/models/basic-user.model';

@Injectable()
export class AppUserService {

    constructor(
        @InjectModel(AppUser.name) private appUserModel: Model<AppUser>,
        private argon2IdService: Argon2IdService,
        private jwtService: JwtService
    ) { }

    public async getAllUsers(): Promise<BasicUser[]> {
        const users = await this.appUserModel.find();
        return users.map(user => removeAllRestrictedDataFromUser(user));
    }


    public async getUserByUsername(username: string): Promise<AppUser> {
        return this.appUserModel.findOne({ username: username });
    }

    public async create(createUser: CreateUser): Promise<AppUser> {
        const privateSalt = this.argon2IdService.generateSalt();
        console.log(createUser.password, privateSalt)
        const passwordHash = await this.argon2IdService.getHashedPassword(createUser.password, privateSalt)
        const appUser: AppUser = {
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            username: createUser.username,
            email: createUser.email,
            phone: createUser.phone,
            studyLanguage: createUser.studyLanguage,
            appRole: createUser.appRole,
            hashedPassword: passwordHash,
            privateSalt: privateSalt,
            active: true
        }
        const createdUser = new this.appUserModel(appUser);
        return createdUser.save();
    }

    public async checkLogin(userCredentials: UserCredentials): Promise<string> {
        const user: AppUser = await this.appUserModel.findOne({ username: userCredentials.username });

        if (!user) {
            throw new UnauthorizedException();
        }

        const result = await this.argon2IdService.comparePasswords(userCredentials.password, user.hashedPassword, user.privateSalt);
        console.log(result);
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
        return await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });
    }

    public update(username: string, appUser: AppUser): Promise<any> {
        return this.appUserModel.updateOne({ username: username, }, {
            firstName: appUser.firstName,
            lastName: appUser.lastName,
            email: appUser.email,
            phone: appUser.phone,
            studyLanguage: appUser.studyLanguage,
            appRole: appUser.appRole
        });
    }

    public delete(username: string): Promise<any> {
        return this.appUserModel.deleteOne({ username: username });
    }
}
