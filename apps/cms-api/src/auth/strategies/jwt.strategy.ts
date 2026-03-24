import { Injectable, Type, UnauthorizedException } from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport";
import type { Request } from "express";
import env from "@repo/env";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){        
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.CMS_ACCESS_TOKEN
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: env.JWT_SECRET
        })
    }

    async validate(payload: {sub: string}): Promise<{userId: string}>{
        
        // TODO: validate if user exist
        return{
            userId: payload.sub,            
        }
    }
}

