import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { VehicleEntity } from "src/containers/vehicle/entities/vehicle.entity";

export class GncDTO {
  @IsNotEmpty()
  @IsDate()
  expireDate: Date;

  @IsNotEmpty()
  @IsString()
  oblea: string;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;
};

export class UpdateGncDTO {
  @IsOptional()
  @IsDate()
  expireDate: Date;

  @IsOptional()
  @IsString()
  oblea: string;

  @IsOptional()
  @IsString()
  plate: string;

  @IsOptional()
  @IsUUID()
  vehicleId: string;
};