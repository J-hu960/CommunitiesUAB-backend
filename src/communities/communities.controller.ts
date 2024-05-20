import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, ParseIntPipe, Req } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Community } from './entities/community.entity';


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
  findAll() {
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
