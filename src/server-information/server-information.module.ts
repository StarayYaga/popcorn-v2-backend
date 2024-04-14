import { Module, forwardRef } from '@nestjs/common';
import { ServerInformationService } from './server-information.service';
import { ServerInformationController } from './server-information.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './service.model';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [ServerInformationService],
  controllers: [ServerInformationController],
  imports:[
    forwardRef(()=> AuthModule),
    SequelizeModule.forFeature([Service])
  ]
})
export class ServerInformationModule {}
