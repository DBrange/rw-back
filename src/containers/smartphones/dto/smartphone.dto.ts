import { IsNotEmpty, IsString } from "class-validator";

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
     
};