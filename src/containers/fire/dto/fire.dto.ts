import { IsNotEmpty, IsString, IsBoolean, IsOptional } from "class-validator";

export class FireDTO {

     @IsNotEmpty()
     @IsString()
     details: string;

     @IsNotEmpty()
     @IsBoolean()
     injured: boolean;

     @IsOptional()
     @IsString()
     injuries: string;

     @IsNotEmpty()
     @IsBoolean()
     ambulance: boolean;

     @IsOptional()
     @IsString()
     ambulanceTo: string;

     @IsNotEmpty()
     @IsBoolean()
     thirdInjured: boolean;
};