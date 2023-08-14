import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FUEL, TYPE } from "src/constants/enums";
import { CarModel } from "src/containers/car-models/entities/carModel.entity";
import { IVehicle } from "src/interfaces/vehicle.interface";


export class VehicleDTO implements IVehicle {

     @IsNotEmpty()
     @IsNumber()
     year: number;

     @IsNotEmpty()
     @IsString()
     color: string;

     @IsNotEmpty()
     @IsString()
     brand: string;

     @IsNotEmpty()
     @IsString()
     model: string;

     @IsNotEmpty()
     @IsString()
     tireBrand: string;

     @IsNotEmpty()
     @IsString()
     tireSize: string;

     @IsNotEmpty()
     @IsNumber()
     tireWear: number;

     @IsNotEmpty()
     @IsBoolean()
     damage: boolean;

     @IsOptional()
     @IsString()
     damageLocation: string;

     @IsNotEmpty()
     @IsString()
     images: string;

     @IsNotEmpty()
     @IsString()
     plate: string;

     @IsNotEmpty()
     @IsBoolean()
     gnc: boolean;

     @IsNotEmpty()
     @IsEnum(FUEL)
     fuel: FUEL;

     @IsNotEmpty()
     @IsEnum(TYPE)
     type: TYPE;

     @IsNotEmpty()
     @IsBoolean()
     okm: boolean;

     @IsOptional()
     @IsUUID()
     carModel: CarModel;
};
