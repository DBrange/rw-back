import { IsNotEmpty, IsEnum, IsString, IsOptional, IsUUID } from "class-validator"
import { ETYPE } from "src/constants/enums"
import { Smartphone } from "src/containers/smartphones/entities/smartphone.entity";
// import { ElectronicsModels } from "src/containers/electronics-models/entities/electronicsModels.entity";

export class ElectronicsDTO {
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
  smartphones: Smartphone;
};
