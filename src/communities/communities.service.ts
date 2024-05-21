import { Injectable, NotFoundException, Req, Request, RequestMethod, UseGuards } from '@nestjs/common';
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

  findUsersCommunities(user: Users) {
    const usersCommunities:Promise<Community[]|[]> = this.communityRepositorty.createQueryBuilder('communitie')
    .innerJoinAndSelect('communitie.members',"Users")
    .getMany()
    return usersCommunities
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }

  async addMemberToCommunitie(user: Users, idCommunity: number) {
    const community: Community = await this.communityRepositorty.createQueryBuilder('coms')
      .select()
      .where('coms.PK_Communitie = :pkComunity', { pkComunity: idCommunity })
      .getOne();
  
    if (community) {
      if (!community.members) {
        community.members = [];
      }
      community.members.push(user);
  
      await this.communityRepositorty.save(community);
  
      return community;
    } else {
      throw new NotFoundException();
    }
  }

  async findByTitle(title:string):Promise<Community[]|[]>{
    const communities:Community[] = await this.communityRepositorty.createQueryBuilder('coms')
    .select()
    .where('coms.title LIKE :title',{title:title}).getMany();
    return communities

  }

  async findByTitleAndCategory(title:string,category:string):Promise<Community[]|[]>{
    const communities:Community[] = await this.communityRepositorty.createQueryBuilder('coms')
    .select()
    .where('coms.title LIKE :title',{title:title})
    .andWhere('coms.category = :category',{category:category})
    .getMany();
    return communities

  }
  async findByCategory(category:string):Promise<Community[]|[]>{
    const communities:Community[] = await this.communityRepositorty.createQueryBuilder('coms')
    .select()
    .where('coms.category = :category',{category:category})
    .getMany();
    return communities
  }
  
}
