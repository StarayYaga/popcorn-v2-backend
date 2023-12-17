import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Post("create")
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllUsers(){
        return this.userService.getAllUsers()
    }
}
