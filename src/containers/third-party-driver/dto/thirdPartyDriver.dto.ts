import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ThirdPartyVehicle } from "src/containers/third-party-vehicle/entities/thirdPartyVehicle.entity";

export class ThirdPartyDriverDTO {

     @IsNotEmpty()
     @IsString()
     name: string;

     @IsNotEmpty()
     @IsString()
     lastName: string;

     @IsNotEmpty()
     @IsString()
     dni: string;

     @IsNotEmpty()
     @IsString()
     address: string;

     @IsNotEmpty()
     @IsString()
     phoneNumber: string;

     @IsNotEmpty()
     @IsString()
     licensePhoto: string;

     @IsNotEmpty()
     @IsEmail()
     email: string;

     @IsNotEmpty()
     @IsUUID()
     thirdPartyVehicle: ThirdPartyVehicle;

     
};