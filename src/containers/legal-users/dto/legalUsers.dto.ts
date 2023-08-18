import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LegalUsersDTO{

     @IsNotEmpty()
     @IsString()
     companyName: string;

     @IsNotEmpty()
     @IsString()
     cuit : string;

     @IsNotEmpty()
     @IsNumber()
     phoneNumber : number;

     @IsNotEmpty()
     @IsEmail()
     email : string;

     @IsOptional()
     @IsEmail()
     altEmail : string;

     @IsNotEmpty()
     @IsString()
     address : string;
}