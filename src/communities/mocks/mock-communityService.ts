import { Users } from "src/users/entities/user.entity";
import { CreateCommunityDto } from "../dto/create-community.dto";
import { Community } from "../entities/community.entity";

export class CommunitiesServiceMocks {
  private mockUser ={
    Pk_User:8,
    Email:'jordi@getMaxListeners.com',
    Password:'21912191'

  }
  private community1:Community = {
    Pk_Communitie: 1,


    title: 'primera',

    category: 'Académico',


    photo:'photurll',

    description: 'descccc',


    link_community: 'link',


    members: [this.mockUser],

    createdBY: this.mockUser,

    
    createdAt: new Date('2024-01-01T00:00:00Z'),

  }
  private community2:Community = {
    Pk_Communitie: 2,


    title: 'string',

    category: "Investigación",


    photo:'photurll',

    description: 'descccc',


    link_community: 'link',


    members: [this.mockUser],

    createdBY: this.mockUser,

    
    createdAt:new Date('2024-01-01T00:00:00Z'),


  }
  private communitiesList:Community[] = [this.community1,this.community2]

  async create(dto: CreateCommunityDto, user: Users): Promise<CreateCommunityDto> {
    return Promise.resolve({
      id: user.Pk_User,
      ...dto,
    });
  }

  async findByTitleAndCategory(title:string,category:string):Promise<Community[]>{
    const filtered:Community[] =  this.communitiesList.filter(community=>community.category ===category && community.title ===title)

    return Promise.resolve(filtered) as Promise<Community[]>
   
  }

  async findAll():Promise<Community[]>{
    return Promise.resolve(this.communitiesList) as Promise<Community[]>
  }

}
