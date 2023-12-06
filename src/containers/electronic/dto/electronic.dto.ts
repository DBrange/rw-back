import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ETYPE } from 'src/constants/enums';
import { SmartphoneEntity } from 'src/containers/smartphone/entities/smartphone.entity';

export class ElectronicDTO {
  @IsNotEmpty()
  @IsEnum(ETYPE)
  type: ETYPE;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsOptional()
  @IsUUID()
  smartphone: string;
}

export class UpdateElectronicDTO {
  @IsOptional()
  @IsEnum(ETYPE)
  type: ETYPE;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsUUID()
  smartphone: string;
}
