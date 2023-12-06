import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { VehicleEntity } from "src/containers/vehicle/entities/vehicle.entity";

export class NewCarDataDTO {
  @IsNotEmpty()
  @IsString()
  noBearingCertificate: string;

  @IsNotEmpty()
  @IsString()
  purceCertificate: string;

  @IsOptional()
  @IsUUID()
  vehicle: string;
}