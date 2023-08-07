import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class FireDTO {

     @IsNotEmpty()
     @IsString()
     details: string;

     @IsNotEmpty()
     @IsBoolean()
     injured: boolean;

     @IsNotEmpty()
     @IsString()
     injuries: string;

     @IsNotEmpty()
     @IsBoolean()
     ambulance: boolean;

     @IsNotEmpty()
     @IsString()
     ambulanceTo: string;

     @IsNotEmpty()
     @IsBoolean()
     thirdInjured: boolean;
};