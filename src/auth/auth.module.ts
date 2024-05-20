import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UsersModule,
    JwtModule.register({
      global:true,
      secret:'Esta es la llave secreta deberia estar en variables de configuracion.',
      signOptions:{expiresIn:'86400s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService],
})
export class AuthModule {}
