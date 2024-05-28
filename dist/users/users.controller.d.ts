import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): string;
    findOne(mail: string): Promise<Users>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
