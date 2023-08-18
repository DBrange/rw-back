import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Electronics } from "src/containers/electronics/entities/electronics.entity";

export class SmartphoneDTO {

     @IsNotEmpty()
     @IsString()
     imei: string;

     @IsNotEmpty()
     @IsNumber()
     phoneNumber: number;

     @IsNotEmpty()
     @IsString()
     phoneService: string;
     
     @IsNotEmpty()
     @IsUUID()
     electronicsId: Electronics;
     
};