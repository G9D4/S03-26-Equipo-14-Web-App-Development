import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import {
  CreateRegisterMemberInput,
  CreateRegisterOwnerInput,
} from './dto/register.dto';
import crypto from 'crypto';
import { UserRepository } from '@repo/api';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';
import sgMail from '@sendgrid/mail';
import globalEnv from '@repo/env';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly apiUser: UserRepository,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    
    const user = await this.apiUser.findByEmail(email);
    console.log(user)
    
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('Password not valid');

    const org = user.organizationMembers[0]
    
    return { sub: user.id, email: user.email, organizationId: org?.organization_id || null, role: org?.role || null };
  }

  async login(loginDto: LoginDto) {
    const payload: JwtPayload = await this.validateUser(loginDto.email, loginDto.password);
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async registerOwner(registerOwnerDto: CreateRegisterOwnerInput) {
    const { password, ...newOwner } = registerOwnerDto;

    const hashPassword = await hash(password, 10);

    const synthUser = {
      ...newOwner,
      hashPassword: hashPassword,
    };

    await this.apiUser.createOwner(synthUser);
  }

  async registerMember(registerMemberDto: CreateRegisterMemberInput) {
    const randomPass = await this.generateRandomPassword();

    const hashPassword = await hash(randomPass, 10);

    const synthUser = {
      ...registerMemberDto,
      generatePassword: hashPassword,
    };

    await this.apiUser.createMember(synthUser);
  }

  async forgotPassword (user : JwtPayload) {
    const rawToken = crypto.randomInt(100000, 1000000).toString();
    const hashedToken = await hash(rawToken, 10);
    const resetExpiration = new Date(Date.now() + 3600000);
    sgMail.setApiKey(globalEnv.SGMAIL_TOKEN)

    const msg = {
      to: "francocasafus55@gmail.com",
      from: "francocasafus55@gmail.com",
      subject: "Sending with SendGrid is Fun",
      html: `<h2>Tu código</h2>
            <h1 style="letter-spacing: 5px;">${rawToken}</h1>`,
    };
    
    await sgMail.send(msg);

    //TODO: save the reserToken in db

    return {
      message: "Email sent",      
    }
  }

  private async generateRandomPassword() {
    return crypto.randomBytes(4).toString('base64').slice(0, 6);
  }

  
}
