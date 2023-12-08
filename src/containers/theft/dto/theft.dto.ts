import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class TheftDTO {
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
  reportPhoto: string;

  @IsNotEmpty()
  @IsBoolean()
  isTire: boolean;
};

export class UpdateTheftDTO {
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
  reportPhoto: string;

  @IsOptional()
  @IsBoolean()
  isTire: boolean;

  @IsOptional()
  @IsUUID()
  theftTire: string;
};