import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { refreshTokenDto } from './dto/refreshToken';
import { UpdateUserDto } from 'src/user/dto/update-user.dto'


@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService){}

    @UsePipes(new ValidationPipe()) 
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto:AuthDto) {
        return this.AuthService.login(dto)
    }
    
    @UsePipes(new ValidationPipe()) 
    @HttpCode(200)
    @Post('login/access-token')
    async getNewTokens(@Body() dto:refreshTokenDto) {
        return this.AuthService.getNewTokens(dto)
    }

    @UsePipes(new ValidationPipe()) 
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto:UpdateUserDto) {
        return this.AuthService.register(dto)
    }

}
