import { IsNotEmpty, IsString } from "class-validator";

export class CarBrandDTO {

     @IsNotEmpty()
     @IsString()
     name: string;
     
};