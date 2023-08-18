import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { GENDER } from "src/constants/enums";
import { Injured } from "src/containers/injured/entities/injured.entity";

export class InjuredInfoDTO {

     @IsNotEmpty()
     @IsString()
     name: string;

     @IsNotEmpty()
     @IsString()
     lastName: string;

     @IsNotEmpty()
     @IsDate()
     birthDate: Date;
     
     @IsNotEmpty()
     @IsNumber()
     phoneNumber: number;

     @IsOptional()
     @IsEmail()
     email: string;

     @IsNotEmpty()
     @IsString()
     dni: string;

     @IsNotEmpty()
     @IsString()
     injuries: string;

     @IsNotEmpty()
     @IsEnum(GENDER)
     gender: GENDER;

     @IsNotEmpty()
     @IsUUID()
     injured: Injured;
     
};