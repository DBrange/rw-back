import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Electronics } from "src/containers/electronics/entities/electronics.entity";

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
     electronicsId: Electronics;
     
};