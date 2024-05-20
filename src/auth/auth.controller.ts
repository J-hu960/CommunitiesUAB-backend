import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
    signUp(@Body() body:CreateUserDto){
        return this.authService.signUp(body)
    }

    @Post('signIn')
    signIn(@Body() body:CreateUserDto){
        return this.authService.signIn(body)
    }


}
