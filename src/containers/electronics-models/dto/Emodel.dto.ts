import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ElectronicsBrands } from "src/containers/electronics-brands/entities/electronicsBrands.entity";

export class EModelDTO {

     @IsNotEmpty()
     @IsString()
     name: string;

     @IsNotEmpty()
     @IsUUID()
     electronicsBrands: ElectronicsBrands;
};