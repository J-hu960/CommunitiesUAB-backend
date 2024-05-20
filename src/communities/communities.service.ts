import { Injectable, Req, Request, RequestMethod, UseGuards } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
@UseGuards(AuthGuard)
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communityRepositorty:Repository<Community>
  ){}
  create(createCommunityDto: CreateCommunityDto,creator:Users  ) {
    this.communityRepositorty.createQueryBuilder('com')
    .insert()
    .into(Community)
    .values({
      ...createCommunityDto,
      createdBY:creator
    })
    .execute()
  }

  async findAll():Promise<Community[] | []> {
    const communities = await this.communityRepositorty.createQueryBuilder('coms')
    .select().getMany()
    return communities
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}
