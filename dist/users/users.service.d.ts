import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    createUser(email: string, hashedPassword: string): Promise<CreateUserDto>;
    findAll(): string;
    findOne(id: number): Promise<Users>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findUserbyMail(email: string): Promise<Users>;
}
