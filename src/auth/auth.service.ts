import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService
    ){}
    async signIn(user:CreateUserDto){

        // const userStored = await this.findUserbyMail(user.Email)
        //  if(!userStored || !( await this.comparePasswords(user.Password,userStored.Password))){
        //   throw new UnauthorizedException()
        
        

        
        // const jwt = await this.createAccessToken(parseInt(userStored.id))
        // console.log(jwt)
        // return jwt
     }

     async signUp(user:CreateUserDto){
        const userExist = await this.findUserbyMail(user.Email)
  
        if(userExist){
          return 'User already exists!!'
        }
  
        const hashedPassword =  await bcrypt.hash(user.Password,10)
        const userId =  uuidv4()
        console.log('Creando...')
  
         await this.userRepository.createQueryBuilder('user')
         .insert()
         .into(User)
         .values({
            Name:user.Name,
            Email:user.Email,
            Password:hashedPassword,
            id:userId
         }).execute()
  
         const jwt = await this.createAccessToken(userId)
         console.log(jwt)
         return jwt
       }

    
}
