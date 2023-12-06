import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { FUEL, TYPE } from 'src/constants/enums';
import { GncEntity } from 'src/containers/gnc/entities/gnc.entity';
import { IVehicle } from 'src/interfaces/vehicle.interface';

export class VehicleDTO implements IVehicle {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  tireBrand: string;

  @IsOptional()
  @IsString()
  tireSize: string;

  @IsOptional()
  @IsNumber()
  tireWear: number;

  @IsNotEmpty()
  @IsBoolean()
  damage: boolean;

  @IsOptional()
  @IsString()
  damageLocation: string;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  images: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsBoolean()
  gnc: boolean;

  @IsNotEmpty()
  @IsEnum(FUEL)
  fuel: FUEL;

  @IsNotEmpty()
  @IsEnum(TYPE)
  type: TYPE;

  @IsNotEmpty()
  @IsBoolean()
  okm: boolean;

  @IsNotEmpty()
  @IsBoolean()
  explodedAirbag: boolean;

  @IsNotEmpty()
  @IsBoolean()
  noSpareTire: boolean;

  @IsOptional()
  @IsUUID()
  gncId: string;
}

export class UpdateVehicleDTO implements IVehicle {
  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  tireBrand: string;

  @IsOptional()
  @IsString()
  tireSize: string;

  @IsOptional()
  @IsNumber()
  tireWear: number;

  @IsOptional()
  @IsBoolean()
  damage: boolean;

  @IsOptional()
  @IsString()
  damageLocation: string;

  @IsOptional({ each: true })
  @IsString({ each: true })
  images: string;

  @IsOptional()
  @IsString()
  plate: string;

  @IsOptional()
  @IsBoolean()
  gnc: boolean;

  @IsOptional()
  @IsEnum(FUEL)
  fuel: FUEL;

  @IsOptional()
  @IsEnum(TYPE)
  type: TYPE;

  @IsOptional()
  @IsBoolean()
  okm: boolean;

  @IsOptional()
  @IsBoolean()
  explodedAirbag: boolean;

  @IsOptional()
  @IsBoolean()
  noSpareTire: boolean;

  @IsOptional()
  @IsUUID()
  gncId: string;
}
