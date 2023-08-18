import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GENDER } from "src/constants/enums";
import { IUser } from "src/interfaces/users.interface";

export class UserDTO implements IUser {
    
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
     @IsEmail()
     email: string;

     @IsOptional()
     @IsEmail()
     altEmail: string;

     @IsNotEmpty()
     @IsString()
     address: string;

     @IsNotEmpty()
     @IsString()
     phoneNumber: string;

     @IsNotEmpty()
     @IsEnum(GENDER)
     gender: GENDER;

     @IsNotEmpty()
     @IsString()
     dni: string;
          
};

export class UserUpdateDTO implements IUser {
    
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
     @IsEmail()
     email: string;

     @IsOptional()
     @IsEmail()
     altEmail: string;

     @IsOptional()
     @IsString()
     address: string;

     @IsOptional()
     @IsString()
     phoneNumber: string;

     @IsOptional()
     @IsEnum(GENDER)
     gender: GENDER;

     @IsOptional()
     @IsString()
     dni: string;
          
};