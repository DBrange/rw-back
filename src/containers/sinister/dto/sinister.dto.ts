import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Asset } from 'src/containers/asset/entities/asset.entity';

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
  asset: Asset;
}
