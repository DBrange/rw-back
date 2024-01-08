import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AssetEntity } from 'src/containers/asset/entities/asset.entity';
import { SinisterTypeEntity } from 'src/containers/sinister-type/entities/sinister-type.entity';

export class SinisterDTO {
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
  @IsUUID()
  asset: AssetEntity;

  @IsOptional()
  @IsUUID()
  sinisterType: SinisterTypeEntity;
}

export class UpdateSinisterDTO {
  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  pdf: string;

  @IsOptional()
  @IsUUID()
  asset: AssetEntity;

  @IsOptional()
  @IsUUID()
  sinisterType: SinisterTypeEntity;
}
