import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(user: CreateUserDto): Promise<string>;
    signUp(user: CreateUserDto): Promise<string>;
    createAccessToken(mail: string): Promise<string>;
    comparePasswords(candidate: string, password: string): Promise<boolean>;
}
