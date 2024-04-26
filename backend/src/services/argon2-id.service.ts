

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { hash, verify } from '@node-rs/argon2';

@Injectable()
export class Argon2IdService {

    constructor() { }

    public async getHashedPassword(password: string, privateSalt: string): Promise<string> {

        const hashPassword = await hash(new Buffer(password), {
            salt: new Buffer(privateSalt),
            secret: new Buffer(process.env.SALT_SECRET),
            outputLen: 64
        });

        return hashPassword;
    }

    public async comparePasswords(password: string, hashedPassword: string, privateSalt: string): Promise<boolean> {

        const result = await verify(hashedPassword, password, {
            salt: new Buffer(privateSalt),
            secret: new Buffer(process.env.SALT_SECRET),
            outputLen: 64
        });

        return result;
    }

    public generateSalt(): string {
        const salt = crypto.randomBytes(16);
        return this.base64Encoding(salt);
    }

    private base64Encoding(input: Buffer): string {
        return input.toString('base64');
    }

}
