import { CrashDTO } from 'src/containers/crash/dto/crash.dto';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { LegalUserDTO } from 'src/containers/legal-user/dto/legal-user.dto';
import { PersonalUserDTO } from 'src/containers/personal-user/dto/personal-user.dto';
import { UserDTO } from 'src/containers/user/dto/user.dto';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { InjuredData, ThirdPartyVehicleData } from '../dto/all-sinister.dto';
import { SinisterEntity } from '../entities/sinister.entity';
import { GncEntity } from '../../gnc/entities/gnc.entity';
import { TheftDTO } from '../../theft/dto/theft.dto';
import { FireDTO } from '../../fire/dto/fire.dto';
import { DamageDTO } from '../../damage/dto/damage.dto';
import { TheftTireDTO } from 'src/containers/theft-tire/dto/theft-tire.dto';
import { SmartphoneDTO } from 'src/containers/smartphone/dto/smartphone.dto';
import { ElectronicDTO } from 'src/containers/electronic/dto/electronic.dto';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { PersonalUserEntity } from 'src/containers/personal-user/entities/personal.user.entity';
import { LegalUserEntity } from 'src/containers/legal-user/entities/legal-user.entity';
import { VehicleEntity } from 'src/containers/vehicle/entities/vehicle.entity';
import { TheftEntity } from 'src/containers/theft/entities/theft.entity';
import { TheftTireEntity } from 'src/containers/theft-tire/entities/theft-tire.entity';
import { FireEntity } from 'src/containers/fire/entities/fire.entity';
import { CrashEntity } from 'src/containers/crash/entities/crash.entity';
import { DamageEntity } from 'src/containers/damage/entities/damage.entity';
import { ElectronicEntity } from 'src/containers/electronic/entities/electronic.entity';
import { SmartphoneEntity } from 'src/containers/smartphone/entities/smartphone.entity';

export interface PDFSend {
  newSinister: SinisterEntity;
  userDTO: UserDTO;
  personalUserDTO: PersonalUserDTO;
  legalUserDTO: LegalUserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO | GncEntity;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
}

export interface PDFSave {
  userDTO: UserDTO | UserEntity;
  personalUserDTO: PersonalUserDTO | PersonalUserEntity;
  legalUserDTO: LegalUserDTO | LegalUserEntity;
  vehicleDTO: VehicleDTO | VehicleEntity;
  gncDTO: GncDTO | GncEntity;
  theftDTO: TheftDTO | TheftEntity;
  theftTireDTO: TheftTireDTO | TheftTireEntity;
  fireDTO: FireDTO | FireEntity;
  crashDTO: CrashDTO | CrashEntity;
  damageDTO: DamageDTO | DamageEntity;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  electronicDTO: ElectronicDTO | ElectronicEntity;
  smartphoneDTO: SmartphoneDTO | SmartphoneEntity;
}
