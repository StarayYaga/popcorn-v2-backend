import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async createUser(dto: CreateUserDto){
        console.log(dto)
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers(){
        const users = this.userRepository.findAll()
        return users
    }

    async getUserByLogin(login: string){
        return this.userRepository.findOne({where:{login}, include: {all:true}})
    }

    async deleteUser(data){
        this.userRepository.destroy({where: {id:data.id}})
    }

}
