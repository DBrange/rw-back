import { IsNotEmpty, IsUUID, IsEnum, IsString } from "class-validator"
import { ETYPE } from "src/constants/enums"
// import { ElectronicsModels } from "src/containers/electronics-models/entities/electronicsModels.entity";
import { Smartphone } from "src/containers/smartphones/entities/smartphone.entity";

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
     // @IsNotEmpty()
     // @IsUUID()
     // electronicModels: ElectronicsModels;

     @IsNotEmpty()
     @IsUUID()
     smartphone: Smartphone;
};
