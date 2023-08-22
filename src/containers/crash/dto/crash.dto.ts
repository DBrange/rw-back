import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CrashDTO {
  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsBoolean()
  injured: boolean;

  @IsNotEmpty()
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
  @IsNumber()
  amountVehicles: number;
};