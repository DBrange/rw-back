import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Sinister } from "src/containers/sinister/entities/sinister.entity";

export class ThirdPartyVehicleDTO {

     @IsNotEmpty()
     @IsString()
     brand: string;

     @IsNotEmpty()
     @IsString()
     model: string;

     @IsNotEmpty()
     @IsNumber()
     year: number;

     @IsNotEmpty()
     @IsString()
     plate: string;

     @IsNotEmpty()
     @IsString()
     insuranceCompany: string;

     @IsNotEmpty()
     @IsString()
     insurancePolicy: string;

     @IsNotEmpty()
     @IsString()
     ownerName: string;

     @IsNotEmpty()
     @IsString()
     ownerLastName: string;

     @IsNotEmpty()
     @IsString()
     ownerDni: string;

     @IsNotEmpty()
     @IsUUID()
     sinister: Sinister;
};