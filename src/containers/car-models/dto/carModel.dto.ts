import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { CarBrands } from "src/containers/car-brands/entities/carBrands.entity";

export class CarModelDTO {

     @IsNotEmpty()
     @IsString()
     name: string;

     @IsOptional()
     @IsUUID()
     carBrands: CarBrands;

};