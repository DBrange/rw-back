import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { LegalUserEntity } from 'src/containers/legal-user/entities/legal-user.entity';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { VehicleEntity } from 'src/containers/vehicle/entities/vehicle.entity';

export class AssetDTO {
  @IsOptional()
  @IsUUID()
  vehicle: string;

  @IsOptional()
  @IsUUID()
  user: string;

  @IsOptional()
  @IsUUID()
  client: string;

  @IsOptional()
  @IsBoolean()
  insured: boolean;

  @IsOptional()
  @IsBoolean()
  inspection: boolean;

  @IsOptional()
  @IsBoolean()
  pdf: string;
}

export class UpdateAssetDTO {
  @IsOptional()
  @IsUUID()
  vehicle: string;

  @IsOptional()
  @IsUUID()
  user: string;

  @IsOptional()
  @IsUUID()
  client: string;

  @IsOptional()
  @IsBoolean()
  insured: boolean;

  @IsOptional()
  @IsBoolean()
  inspection: boolean;

  @IsOptional()
  @IsBoolean()
  pdf: string;
}
