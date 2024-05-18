import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '21912191-Js',
      database: 'communitiesUAB',
      entities: [],
      synchronize: true,

    }),
    ThrottlerModule.forRoot([{
      ttl:6000,
      limit:10
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
