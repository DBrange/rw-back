import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class FireDTO {
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
}

export class UpdateFireDTO {
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
}
