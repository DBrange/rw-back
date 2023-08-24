import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { InjuredInfoDTO } from "src/containers/injured-info/dto/injuredInfo.dto";
import { Sinister } from "src/containers/sinister/entities/sinister.entity";

export class InjuredDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsUUID()
  injuredInfo: InjuredInfoDTO[]
  
  @IsOptional()
  @IsUUID()
  sinister: Sinister;
};