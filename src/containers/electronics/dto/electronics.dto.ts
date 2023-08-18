import { IsNotEmpty, IsEnum, IsString } from "class-validator"
import { ETYPE } from "src/constants/enums"
// import { ElectronicsModels } from "src/containers/electronics-models/entities/electronicsModels.entity";

export class ElectronicsDTO {

     @IsNotEmpty()
     @IsEnum(ETYPE)
     type: ETYPE;


     @IsNotEmpty()
     @IsString()
     brand: string;

     @IsNotEmpty()
     @IsString()
     model: string;
     

};
