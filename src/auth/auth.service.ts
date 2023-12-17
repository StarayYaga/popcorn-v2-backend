import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/user.model';


@Injectable()
export class AuthService {
    
    constructor(private userService: UsersService,
                private jwtService: JwtService
        ){}
    
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login)
        if (candidate){
            throw new HttpException(
                "Пользователь с таким логином уже существует!", HttpStatus.BAD_REQUEST
            )
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await  this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {login: user.login, id: user.id, status: user.status}
        return {
            token: this.jwtService.sign(payload)
        }
        
    }
    private async validateUser(userDto: CreateUserDto){
        const user =await  this.userService.getUserByLogin(userDto.login)
        const passTrue = await bcrypt.compare(userDto.password, user.password)
        if (user && passTrue){
            return user
        }
        throw new UnauthorizedException("Не корректный логин или пароль.")
    }
}

