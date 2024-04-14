import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api')
export class UsersController {
    constructor(private userService: UsersService){}

    // @UseGuards(JwtAuthGuard)
    // @Post("create")
    // create(@Body() userDto: CreateUserDto){
    //     return this.userService.createUser(userDto)
    // }

    @UseGuards(JwtAuthGuard)
    @Get('allUsers')
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Post('deleteUser')
    deleteUser(@Body() data){
        return this.userService.deleteUser(data)
    }
    
}
