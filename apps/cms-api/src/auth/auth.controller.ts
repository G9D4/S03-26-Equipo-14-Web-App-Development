import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { Public } from './decorators/public.decorator';
import {
  CreateRegisterMemberDto,
  CreateRegisterOwnerDto,
} from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(loginDto);
    // Dev config
    res.cookie('CMS_ACCESS_TOKEN', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });

    return {
      message: 'Login successful',
    };
  }

  @Get('me')
  async me(@GetUser() user: { userId: string }) {
    return user;
  }

  @Post('/owner')
  async owner(@Body() registerOwnerDto: CreateRegisterOwnerDto) {
    //use service registerOwner
    return this.authService.registerOwner(registerOwnerDto);
  }

  @Post('/member')
  async member(@Body() registerMemberDto: CreateRegisterMemberDto) {
    //use service registerMember
    return this.authService.registerMember(registerMemberDto);
  }
}
