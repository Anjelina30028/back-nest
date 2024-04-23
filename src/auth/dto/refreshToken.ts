import { IsString } from "class-validator";

export class refreshTokenDto{
    @IsString({
        message: "Токен должен быть строкой, либо был передан не токен"
    })
    refreshToken:string;
}