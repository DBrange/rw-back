import { CrashDTO } from "src/containers/crash/dto/crash.dto";
import { GncDTO } from "src/containers/gnc/dto/gnc.dto";
import { LegalUserDTO } from "src/containers/legal-user/dto/legal-user.dto";
import { PersonalUserDTO } from "src/containers/personal-user/dto/personal-user.dto";
import { UserDTO } from "src/containers/user/dto/user.dto";
import { VehicleDTO } from "src/containers/vehicle/dto/vehicle.dto";
import { InjuredData, ThirdPartyVehicleData } from "../dto/all-sinister.dto";
import { SinisterEntity } from "../entities/sinister.entity";
import { GncEntity } from '../../gnc/entities/gnc.entity';

export interface PDF {
  newSinister: SinisterEntity;
  userDTO: UserDTO;
  personalUserDTO: PersonalUserDTO;
  legalUserDTO: LegalUserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO | GncEntity;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  resolve: any;
}
