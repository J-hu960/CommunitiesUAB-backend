import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository:Repository<Users>
  ){}
  async createUser(email:string,hashedPassword:string):Promise<CreateUserDto> {
    await  this.userRepository.createQueryBuilder('user')
    .insert()
    .into(Users)
    .values({
       Email:email,
       Password:hashedPassword,
    }).execute()
    const newUser ={
      Email:email,
      Password:hashedPassword
    }
    return newUser
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number):Promise<Users> {
    return this.userRepository.createQueryBuilder('user')
    .select()
    .where('user.Pk_User =:id',{id:id}).getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findUserbyMail(email:string):Promise<Users>{
    return this.userRepository.createQueryBuilder('user')
    .where('user.Email=:email',{email:email}).getOne()
   }
}
