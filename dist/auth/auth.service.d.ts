import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signIn(user: CreateUserDto): Promise<void>;
    signUp(user: CreateUserDto): Promise<any>;
}
