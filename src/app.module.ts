import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/user.model";
import { AuthModule } from './auth/auth.module';
import { ServerInformationModule } from './server-information/server-information.module';
import { Service } from "./server-information/service.model";



@Module({
    controllers:[],
    providers:[],
    imports:[
        ConfigModule.forRoot({
            envFilePath:'.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.host_db,
            port: Number(process.env.port_db),
            username: process.env.username_db,
            password: process.env.password_db,
            database: process.env.database_db,
            models: [User, Service],
            autoLoadModels: true
          }),
        UsersModule,
        AuthModule,
        ServerInformationModule,
    ]
})
export class AppModule{}