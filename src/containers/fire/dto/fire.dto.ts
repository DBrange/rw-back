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
