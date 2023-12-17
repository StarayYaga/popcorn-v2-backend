import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    forwardRef(()=> AuthModule),
    SequelizeModule.forFeature([User])
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
