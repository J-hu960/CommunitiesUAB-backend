import { Users } from "src/users/entities/user.entity";
import { categories } from "../types/categories";

export class CreateCommunityDto {

    title:string
    category:categories
    photo:string;
    description:string;
    link_community:string;
   
}
