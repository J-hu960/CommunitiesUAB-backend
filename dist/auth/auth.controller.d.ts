import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: CreateUserDto): Promise<string>;
    signIn(body: CreateUserDto): Promise<string>;
}
