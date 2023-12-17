import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=> UsersModule),
    JwtModule.register({
      secret: String(process.env.privateKey),
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
