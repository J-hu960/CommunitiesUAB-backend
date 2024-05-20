import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import { Users } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { CommunitiesModule } from './communities/communities.module';
import { Community } from './communities/entities/community.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '21912191-Js',
      database: 'communitiesUAB',
      entities: [Users,Community],
      synchronize: false,

    }),
    ThrottlerModule.forRoot([{
      ttl:6000,
      limit:10
    }]),
    UsersModule,
    AuthModule,
    CommunitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
