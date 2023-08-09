import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Vehicle } from "src/containers/vehicle/entities/vehicle.entity";

export class NewCarDataDTO {
     
     @IsNotEmpty()
     @IsString()
     noBearingCertificate: string[];

     @IsNotEmpty()
     @IsString()
     purceCertificate: string[];

     @IsOptional()
     @IsUUID()
     vehicle: Vehicle;
}