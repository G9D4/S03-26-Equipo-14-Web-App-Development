import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {
  CreateRegisterMemberInput,
  CreateRegisterOwnerInput,
} from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // TODO: validate user
    const user = { email: email, password: pass, _id: '123' };

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = pass === user.password;
    if (!isMatch) throw new UnauthorizedException('Password not valid');

    return { _id: user._id };
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerOwner(registerOwnerDto: CreateRegisterOwnerInput) {
    //create user with role owner
    //rel owner -> org
    //create org
    //rel org_member -> project
    //create default proyect

    //use transaction prisma for this
  }

  async registerMember(registerMemberDto: CreateRegisterMemberInput) {
    //create user with roles -(admin, editor)
    //rel with organizationId

    //use transaction prisma for this
  }
}
