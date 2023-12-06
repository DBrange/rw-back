import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ThirdPartyDriverDTO {
     @IsOptional()
     @IsString()
     name: string;

     @IsOptional()
     @IsString()
     lastName: string;

     @IsOptional()
     @IsString()
     dni: string;

     @IsNotEmpty()
     @IsString()
     address: string;

     @IsNotEmpty()
     @IsString()
     phoneNumber: string;

     @IsNotEmpty()
     @IsString()
     licensePhoto: string;

     @IsNotEmpty()
     @IsEmail()
     email: string;
};

export class UpdateThirdPartyDriverDTO {
     @IsOptional()
     @IsString()
     name: string;

     @IsOptional()
     @IsString()
     lastName: string;

     @IsOptional()
     @IsString()
     dni: string;

     @IsOptional()
     @IsString()
     address: string;

     @IsOptional()
     @IsString()
     phoneNumber: string;

     @IsOptional()
     @IsString()
     licensePhoto: string;

     @IsOptional()
     @IsEmail()
     email: string;
};