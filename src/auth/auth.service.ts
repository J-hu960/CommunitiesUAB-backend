import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import { Users } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService

    ){}
    async signIn(user:CreateUserDto){

        const userStored = await this.usersService.findUserbyMail(user.Email)
        if(!userStored || !( await this.comparePasswords(user.Password,userStored.Password))){
            throw new UnauthorizedException()
         }

        const jwt = await this.createAccessToken(userStored.Pk_User.toString())
         console.log(jwt)
        return jwt
     }

     async signUp(user:CreateUserDto){
        const userExist = await this.usersService.findUserbyMail(user.Email)
  
        if(userExist){
          return 'User already exists!!'
        }
  
        const hashedPassword =  await bcrypt.hash(user.Password,10)

          await this.usersService.createUser(user.Email,hashedPassword)
          const jwt = await this.createAccessToken(user.Email)
          return jwt
         
       }

       async createAccessToken(mail:string):Promise<string>{
        const payload = {mail:mail}
        const access_token:string = await this.jwtService.signAsync(payload)
        return  access_token
       }

       async comparePasswords(candidate:string,password:string):Promise<boolean>{
        return await bcrypt.compare(candidate,password)
       }

    
}
