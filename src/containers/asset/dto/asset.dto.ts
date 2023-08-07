import { IsOptional, IsUUID } from "class-validator";
import { Electronics } from "src/containers/electronics/entities/electronics.entity";
import { LegalUsers } from "src/containers/legal-users/entities/legalUsers.entity";
import { User } from "src/containers/users/entities/user.entity";
import { Vehicle } from "src/containers/vehicle/entities/vehicle.entity";

export class AssetDTO {

     @IsOptional()
     @IsUUID()
     vehicle: Vehicle;

     @IsOptional()
     @IsUUID()
     users: User;

     @IsOptional()
     @IsUUID()
     legalUsers: LegalUsers;

     @IsOptional()
     @IsUUID()
     electronics: Electronics;


};