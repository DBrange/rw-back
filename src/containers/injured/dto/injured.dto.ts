import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { InjuredInfoDTO } from "src/containers/injured-info/dto/injured-info.dto";
import { InjuredInfoEntity } from "src/containers/injured-info/entities/injured-info.entity";
import { SinisterEntity } from "src/containers/sinister/entities/sinister.entity";

export class InjuredDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsUUID()
  injuredInfo: InjuredInfoDTO[];

  @IsOptional()
  @IsUUID()
  sinister: string;
};

export class UpdateInjuredDTO {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsUUID()
  injuredInfo: InjuredInfoEntity[];

  @IsOptional()
  @IsUUID()
  sinister: string;
};