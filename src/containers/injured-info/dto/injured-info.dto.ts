import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { GENDER } from "src/constants/enums";
import { InjuredEntity } from "src/containers/injured/entities/injured.entity";

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
     @IsString()
     phoneNumber: string;

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
     injured: InjuredEntity;
};

export class UpdateInjuredInfoDTO {
     @IsOptional()
     @IsString()
     name: string;

     @IsOptional()
     @IsString()
     lastName: string;

     @IsOptional()
     @IsDate()
     birthDate: Date;
     
     @IsOptional()
     @IsString()
     phoneNumber: string;

     @IsOptional()
     @IsEmail()
     email: string;

     @IsOptional()
     @IsString()
     dni: string;

     @IsOptional()
     @IsString()
     injuries: string;

     @IsOptional()
     @IsEnum(GENDER)
     gender: GENDER;

     @IsOptional()
     @IsUUID()
     injured: InjuredEntity;
};