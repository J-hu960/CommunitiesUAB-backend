import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([Community]),AuthModule,UsersModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService,UsersService],
  exports:[CommunitiesService,TypeOrmModule.forFeature([Community])]

})
export class CommunitiesModule {}
