import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ElectronicEntity } from "src/containers/electronic/entities/electronic.entity";

export class SmartphoneDTO {
  @IsNotEmpty()
  @IsString()
  imei: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  phoneService: string;

  @IsNotEmpty()
  @IsUUID()
  electronic: string;
};

export class UpdateSmartphoneDTO {
  @IsOptional()
  @IsString()
  imei: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  phoneService: string;

  @IsOptional()
  @IsUUID()
  electronic: string;
};