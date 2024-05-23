import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { categories } from "../types/categories";  
import { Users } from "src/users/entities/user.entity";

@Entity()
export class Community {

    @PrimaryGeneratedColumn()
    Pk_Communitie: number;

    @Column()
    title: string;

    @Column()
    category: categories;

    @Column()
    photo: string;

    @Column()
    description: string;

    @Column()
    link_community: string;

    @ManyToMany(() => Users)
    @JoinTable()
    members: Users[];

    @ManyToOne(() => Users, (user) => user.Pk_User,{cascade:true})
    createdBY: Users;

    @CreateDateColumn()
    createdAt: Date;
}
