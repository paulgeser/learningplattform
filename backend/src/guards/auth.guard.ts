import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppRole } from 'src/models/user/app-role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        const roles = this.reflector.get<AppRole[]>('roles', context.getHandler());
        if (!roles.find(x => x === (payload.role as AppRole))) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        return true;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        if (Object.keys(request.cookies).find(x => x === process.env.JWT_COOKIE_NAME)) {
            return request.cookies[process.env.JWT_COOKIE_NAME];
        }
        return undefined;
    }
}