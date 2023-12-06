import { IsNotEmpty, IsString, IsDate, IsBoolean, IsOptional } from "class-validator";

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

export class UpdateCrashDTO {
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
  @IsBoolean()
  injured: boolean;

  @IsOptional()
  @IsString()
  injuries: string;

  @IsOptional()
  @IsBoolean()
  ambulance: boolean;

  @IsOptional()
  @IsString()
  ambulanceTo: string;

  @IsOptional()
  @IsBoolean()
  thirdInjured: boolean;

  @IsOptional()
  @IsBoolean()
  friendlyStatement: boolean;
};