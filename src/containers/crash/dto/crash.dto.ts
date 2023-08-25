import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CrashDTO {
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

  @IsNotEmpty()
  @IsBoolean()
  friendlyStatement: boolean;
};