import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class DamageDTO {
  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsString()
  reportPhoto: string;
};

export class UpdateDamageDTO {
  @IsOptional()
  @IsString()
  time: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  details: string;

  @IsOptional()
  @IsString()
  photo: string;
};