import { IsNotEmpty, IsString, IsDate, IsEnum, IsOptional } from "class-validator";
import { GENDER } from "src/constants/enums";

export class PersonalUserDTO {
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
  @IsEnum(GENDER)
  gender: GENDER;

  @IsNotEmpty()
  @IsString()
  dni: string;
}

export class UpdatePersonalUserDTO {
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
  @IsEnum(GENDER)
  gender: GENDER;

  @IsOptional()
  @IsString()
  dni: string;
}