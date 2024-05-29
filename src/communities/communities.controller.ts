import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, ParseIntPipe, Req, Query } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Community } from './entities/community.entity';
import { title } from 'process';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';


@UseGuards(AuthGuard)
@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private usersService:UsersService
  ) {}

  @Post(':idUser')
  async create(@Param('idUser') idUser:number,@Body() createCommunityDto: CreateCommunityDto) {
    try {
      const user:Users = await this.usersService.findOne(idUser)
      await console.log(user)
      return this.communitiesService.create(createCommunityDto,user);
      
    } catch (error) {
      console.log(error)
    }
   
  }

  @Get()
  findAll(
    @Query('title') title?:string,
    @Query('category') category?:string
  ) {
    if(title && category){
      return this.communitiesService.findByTitleAndCategory(title,category)
    }
    else if(title){
      return this.communitiesService.findByTitle(title)
    }else if(category){
      return this.communitiesService.findByCategory(category)
    }
    return this.communitiesService.findAll();
  }
  
   @Post(':pkCommunitie/:idUser')  
   async addMember(
     @Param('pkCommunitie') idCommunity:number,
     @Param('idUser') idUser:number
    ) {
     const newMember = await this.usersService.findOne(idUser)
     return this.communitiesService.addMemberToCommunitie(newMember,idCommunity);
   }

  @Get(':idUser')
  //:Promise<Community[]|[]>
   async findUserCommunities(@Param('idUser') idUser:number)  {
    const user:Users = await this.usersService.findOne(idUser)
    console.log(user)
    return this.communitiesService.findUsersCommunities(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communitiesService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.communitiesService.removeCommunity(id);
  }
}
