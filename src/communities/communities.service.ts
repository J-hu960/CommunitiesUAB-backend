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
    const community = new Community()
    community.category=createCommunityDto.category
    community.createdBY = creator
    community.description = createCommunityDto.description
    community.link_community = createCommunityDto.link_community
    community.photo = createCommunityDto.photo
    community.title = createCommunityDto.title
    
    this.communityRepositorty.save(community)
  }

  async findAll():Promise<Community[] | []> {
    const communities:Community[]|[] = await this.communityRepositorty.createQueryBuilder('coms')
    .select().getMany()
    return communities
  }

  async findUsersCommunities(user: Users): Promise<Community[]> {
    return this.communityRepositorty.createQueryBuilder('community')
      .leftJoinAndSelect('community.members', 'members')
      .leftJoinAndSelect('community.createdBY', 'creator')
      .where('members.Pk_User = :userId OR creator.Pk_User = :userId', { userId: user.Pk_User })
      .getMany();
  }
  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  removeCommunity(id: number) {
    return  this.communityRepositorty.createQueryBuilder()
    .delete()
    .from(Community)
    .where('Pk_Communitie = :id',{id:id})
    .execute()
  }

  async addMemberToCommunitie(user: Users, idCommunity: number) {
    const community: Community|null = await this.communityRepositorty.createQueryBuilder('coms')
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
