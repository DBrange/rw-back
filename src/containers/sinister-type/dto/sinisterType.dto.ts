import { IsOptional, IsUUID } from "class-validator";
import { Crash } from "src/containers/crash/entities/crash.entity";
import { Damage } from "src/containers/damage/entities/damage.entity";
import { Fire } from "src/containers/fire/entities/fire.entity";
import { Sinister } from "src/containers/sinister/entities/sinister.entity";
import { Theft } from "src/containers/theft/entities/theft.entity";

export class sinisterTypeDTO {

     @IsOptional()
     @IsUUID()
     crash: Crash;

     @IsOptional()
     @IsUUID()
     fire: Fire;

     @IsOptional()
     @IsUUID()
     damage: Damage;
     
     @IsOptional()
     @IsUUID()
     theft: Theft;

    //  @IsOptional()
    //  @IsUUID()
    //  sinister: Sinister;
     
};