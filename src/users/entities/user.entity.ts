import { IsEmail, MaxLength, MinLength, isEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    Pk_User:number;

    @Column()
    @IsEmail()
    Email:string

    @Column()
    @MinLength(8)
    @MaxLength(15)
    Password:string

 

}