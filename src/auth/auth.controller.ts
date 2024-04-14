import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post("login")
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @Post("registration")
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }

}
