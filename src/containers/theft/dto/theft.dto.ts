import { IsNotEmpty, IsString } from "class-validator";

export class TheftDTO {

     @IsNotEmpty()
     @IsString()
     reportPhoto: string;

     
};