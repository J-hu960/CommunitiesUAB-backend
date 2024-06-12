import { Users } from "src/users/entities/user.entity";
import { CreateCommunityDto } from "../dto/create-community.dto";

export class CommunitiesServiceMocks {
  async create(dto: CreateCommunityDto, user: Users): Promise<CreateCommunityDto> {
    return Promise.resolve({
      id: user.Pk_User,
      ...dto,
    });
  }
}
