import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, ParseIntPipe, Req, Query } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Community } from './entities/community.entity';
import { title } from 'process';


@UseGuards(AuthGuard)
@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService
  ) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto,@Request() req) {
    const creator = req.user
    return this.communitiesService.create(createCommunityDto,creator);
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
  
  @Post(':pkCommunitie')  
  addMember(@Request() req, @Param('pkCommunitie') idCommunity:number) {
    const newMember = req.user
    return this.communitiesService.addMemberToCommunitie(newMember,idCommunity);
  }

  @Get(':idUser')
  findUserCommunities(@Req() req):Promise<Community[]|[]> {
    return this.communitiesService.findUsersCommunities(req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communitiesService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(+id);
  }
}
