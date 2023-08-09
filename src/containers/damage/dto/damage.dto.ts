import { IsNotEmpty, IsString } from "class-validator";


export class DamageDTO  {
     
     @IsNotEmpty()
     @IsString()
     details: string;

     @IsNotEmpty()
     @IsString()
     photo: string[];
};