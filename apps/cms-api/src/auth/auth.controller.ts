import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    

    @Get("me")
    async me(@GetUser() user: {userId: string}){
        return user
    }
}
