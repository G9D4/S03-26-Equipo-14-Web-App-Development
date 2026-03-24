import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: keyof {userId: string}, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user as {userId: string}
        return data ? user[data] : user
    }
)