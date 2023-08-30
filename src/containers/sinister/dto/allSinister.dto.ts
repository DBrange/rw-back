import { TheftDTO } from 'src/containers/theft/dto/theft.dto';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { UserDTO } from 'src/containers/users/dto/user.dto';
import { TheftTireDTO } from 'src/containers/theft-tire/dto/theftTire.dto';
import { AssetDTO } from 'src/containers/asset/dto/asset.dto';
import { FireDTO } from '../../fire/dto/fire.dto';
import { InjuredInfoDTO } from 'src/containers/injured-info/dto/injuredInfo.dto';
import { CrashDTO } from 'src/containers/crash/dto/crash.dto';
import { ThirdPartyVehicleDTO } from 'src/containers/third-party-vehicle/dto/thirdPartyVehicle.dto';
import { ThirdPartyDriverDTO } from 'src/containers/third-party-driver/dto/thirdPartyDriver.dto';
import { LegalUsersDTO } from 'src/containers/legal-users/dto/legalUsers.dto';
import { ElectronicsDTO } from 'src/containers/electronics/dto/electronics.dto';
import { SmartphoneDTO } from '../../smartphones/dto/smartphone.dto';

export class SinisterUserVehicleTheftDTO {
  userDTO: UserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterUserVehicleFireDTO {
  userDTO: UserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  fireDTO: FireDTO;
  injuredDTO: InjuredData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export interface InjuredData {
  amount: number;
  injuredInfo: InjuredInfoDTO[];
}

export class SinisterUserVehicleCrashDTO {
  userDTO: UserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export type ThirdParty = (ThirdPartyVehicleDTO & ThirdPartyDriverDTO)[];

export interface ThirdPartyVehicleData {
  thirdPartyVehicleInfo: any;
}

export class SinisterlegalUserVehicleTheftDTO {
  legalUserDTO: LegalUsersDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterLegalUserVehicleFireDTO {
  legalUserDTO: LegalUsersDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  fireDTO: FireDTO;
  injuredDTO: InjuredData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterLegalUserVehicleCrashDTO {
  legalUserDTO: LegalUsersDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterUserElectronicTheftDTO {
  userDTO: UserDTO;
  electronicDTO: ElectronicsDTO;
  smartPhoneDTO: SmartphoneDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterLegalUserElectronicTheftDTO {
  legalUserDTO: LegalUsersDTO;
  electronicDTO: ElectronicsDTO;
  smartPhoneDTO: SmartphoneDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}
