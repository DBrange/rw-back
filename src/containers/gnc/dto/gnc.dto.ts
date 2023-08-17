import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Vehicle } from "src/containers/vehicle/entities/vehicle.entity";

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
     vehicleId: Vehicle
};