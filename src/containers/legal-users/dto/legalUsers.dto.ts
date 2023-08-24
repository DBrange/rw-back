import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LegalUsersDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  cuit: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
