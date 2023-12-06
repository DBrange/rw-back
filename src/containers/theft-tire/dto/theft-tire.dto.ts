import { IsNotEmpty, IsNumber, IsUUID, IsString, IsOptional } from 'class-validator';

export class TheftTireDTO {
  @IsNotEmpty()
  @IsNumber()
  tireAmount: number;

  @IsNotEmpty()
  @IsNumber()
  tireWear: number;

  @IsNotEmpty()
  @IsString()
  tirePhoto: string;

  @IsNotEmpty()
  @IsString()
  replacementLocation: string;

  @IsNotEmpty()
  @IsUUID()
  theft: string;
}

export class UpdateTheftTireDTO {
  @IsOptional()
  @IsNumber()
  tireAmount: number;

  @IsOptional()
  @IsNumber()
  tireWear: number;

  @IsOptional()
  @IsString()
  tirePhoto: string;

  @IsOptional()
  @IsString()
  replacementLocation: string;

  @IsOptional()
  @IsUUID()
  theft: string;
}
