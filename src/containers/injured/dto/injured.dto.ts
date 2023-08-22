import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { Sinister } from "src/containers/sinister/entities/sinister.entity";

export class InjuredDTO {

     @IsNotEmpty()
     @IsNumber()
     amount: number;

     @IsOptional()
     @IsUUID()
     sinister: Sinister;
     
};