import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { Community } from './entities/community.entity';
import { UsersService } from 'src/users/users.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CommunitiesServiceMocks } from './mocks/mock-communityService';

describe('CommunitiesController', () => {
  let controller: CommunitiesController;
 

  let createCommunity:CreateCommunityDto = {
    title:'testCommunity',
    category:"Académico",
    photo:'some_url',
    description:'some description',
    link_community:'some_link.com'
  }
  let mockUser ={
    Pk_User:8,
    Email:'jordi@getMaxListeners.com',
    Password:'21912191'

  }
  let jwtServiceMock = {
    sign: jest.fn().mockReturnValue('mockToken'),
    verify: jest.fn().mockReturnValue({ userId: mockUser.Pk_User }),
  };
  let usersServiceMock={
    findOne:jest.fn((id)=>mockUser)
  }

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiesController],
      providers: [CommunitiesService,
        UsersService,
        AuthGuard,
        {provide:JwtService,useValue:jwtServiceMock}
      ],
    })
    .overrideProvider(CommunitiesService)
    .useValue(new CommunitiesServiceMocks())
    .overrideProvider(UsersService)
    .useValue(usersServiceMock)
    .overrideGuard(AuthGuard)
    .useValue({
      canActivate:jest.fn().mockReturnValue(true)
    })
    .compile();

    controller = module.get<CommunitiesController>(CommunitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a community',async()=>{
    const result = await controller.create(mockUser.Pk_User,createCommunity)
    expect(result).toEqual({
      id:mockUser.Pk_User,
      ...createCommunity
    })
  })
});
