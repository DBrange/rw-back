import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AssetEntity } from 'src/containers/asset/entities/asset.entity';
import { SinisterType } from 'src/containers/sinister-type/entities/sinisterType.entity';

export class SinisterDTO {
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
  @IsUUID()
  asset: AssetEntity;

  @IsOptional()
  @IsUUID()
  sinisterType: SinisterType;
}
