import { ElectronicDTO } from "src/containers/electronic/dto/electronic.dto";
import { ElectronicEntity } from "src/containers/electronic/entities/electronic.entity";
import { GncDTO } from "src/containers/gnc/dto/gnc.dto";
import { GncEntity } from "src/containers/gnc/entities/gnc.entity";
import { LegalUserDTO } from "src/containers/legal-user/dto/legal-user.dto";
import { LegalUserEntity } from "src/containers/legal-user/entities/legal-user.entity";
import { PersonalUserDTO } from "src/containers/personal-user/dto/personal-user.dto";
import { PersonalUserEntity } from "src/containers/personal-user/entities/personal.user.entity";
import { SmartphoneDTO } from "src/containers/smartphone/dto/smartphone.dto";
import { SmartphoneEntity } from "src/containers/smartphone/entities/smartphone.entity";
import { UserDTO } from "src/containers/user/dto/user.dto";
import { UserEntity } from "src/containers/user/entities/user.entity";
import { VehicleDTO } from "src/containers/vehicle/dto/vehicle.dto";
import { VehicleEntity } from "src/containers/vehicle/entities/vehicle.entity";

export interface PDFSaveInAsset {
  userDTO: UserDTO | UserEntity;
  personalUserDTO: PersonalUserDTO | PersonalUserEntity;
  legalUserDTO: LegalUserDTO | LegalUserEntity;
  vehicleDTO: VehicleDTO | VehicleEntity;
  gncDTO: GncDTO | GncEntity;
  electronicDTO: ElectronicDTO | ElectronicEntity;
  smartphoneDTO: SmartphoneDTO | SmartphoneEntity;
}
