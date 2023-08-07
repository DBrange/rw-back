import { IsNotEmpty, IsString } from "class-validator";

export class EBrandsDTO {

     @IsNotEmpty()
     @IsString()
     name: string;

};