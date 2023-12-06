import { IsOptional, IsUUID } from "class-validator";
import { CrashEntity } from "src/containers/crash/entities/crash.entity";
import { DamageEntity } from "src/containers/damage/entities/damage.entity";
import { FireEntity } from "src/containers/fire/entities/fire.entity";
import { TheftEntity } from "src/containers/theft/entities/theft.entity";

export class SinisterTypeDTO {
  @IsOptional()
  @IsUUID()
  crash: string;

  @IsOptional()
  @IsUUID()
  fire: string;

  @IsOptional()
  @IsUUID()
  damage: string;

  @IsOptional()
  @IsUUID()
  theft: string;
};

export class UpdateSinisterTypeDTO {
  @IsOptional()
  @IsUUID()
  crash: string;

  @IsOptional()
  @IsUUID()
  fire: string;

  @IsOptional()
  @IsUUID()
  damage: string;

  @IsOptional()
  @IsUUID()
  theft: string;
};