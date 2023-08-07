import { IsDate, IsMilitaryTime, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Asset } from "src/containers/asset/entities/asset.entity";

export class SinisterDTO {

     @IsNotEmpty()
     @IsMilitaryTime()
     time: string;

     @IsNotEmpty()
     @IsDate()
     date: Date;

     @IsNotEmpty()
     @IsString()
     locations: string;
     
     @IsNotEmpty()
     @IsUUID()
     asset: Asset;
}