import { AssetDTO } from 'src/containers/asset/dto/asset.dto';
import { CrashDTO } from 'src/containers/crash/dto/crash.dto';
import { DamageDTO } from 'src/containers/damage/dto/damage.dto';
import { ElectronicDTO } from 'src/containers/electronic/dto/electronic.dto';
import { FireDTO } from 'src/containers/fire/dto/fire.dto';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { InjuredInfoDTO } from 'src/containers/injured-info/dto/injured-info.dto';
import { LegalUserDTO } from 'src/containers/legal-user/dto/legal-user.dto';
import { SmartphoneDTO } from 'src/containers/smartphone/dto/smartphone.dto';
import { TheftTireDTO } from 'src/containers/theft-tire/dto/theft-tire.dto';
import { TheftDTO } from 'src/containers/theft/dto/theft.dto';
import { ThirdPartyDriverDTO } from 'src/containers/third-party-driver/dto/third-party-driver.dto';
import { ThirdPartyVehicleDTO } from 'src/containers/third-party-vehicle/dto/third-party-vehicle.dto';
import { UserDTO } from 'src/containers/user/dto/user.dto';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';

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
  legalUserDTO: LegalUserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterLegalUserVehicleFireDTO {
  legalUserDTO: LegalUserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  fireDTO: FireDTO;
  injuredDTO: InjuredData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterLegalUserVehicleCrashDTO {
  legalUserDTO: LegalUserDTO;
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
  electronicDTO: ElectronicDTO;
  smartPhoneDTO: SmartphoneDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterLegalUserElectronicTheftDTO {
  legalUserDTO: LegalUserDTO;
  electronicDTO: ElectronicDTO;
  smartPhoneDTO: SmartphoneDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterTheft {
  brokerId: string;
  clientId: string;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}
export class SinisterFire {
  brokerId: string;
  clientId: string;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  fireDTO: FireDTO;
  injuredDTO: InjuredData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterCrash {
  brokerId: string;
  clientId: string;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class SinisterDamage {
  brokerId: string;
  clientId: string;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  damageDTO: DamageDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}
export class SinisterTheftInspection {
  assetId: string;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  swornDeclaration: boolean;
}
export class SinisterFireInspection {
  assetId: string;
  fireDTO: FireDTO;
  injuredDTO: InjuredData;
  swornDeclaration: boolean;
}

export class SinisterCrashInspection {
  assetId: string;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  swornDeclaration: boolean;
}

export class SinisterDamageInspection {
  assetId: string;
  damageDTO: DamageDTO;
  swornDeclaration: boolean;
}

export class SinisterElement {
  elementId: string;
  theftDTO: TheftDTO;
  theftTireDTO: TheftTireDTO;
  fireDTO: FireDTO;
  crashDTO: CrashDTO;
  injuredDTO: InjuredData;
  thirdPartyVehicleDTO: ThirdPartyVehicleData;
  damageDTO: DamageDTO;
  swornDeclaration: boolean;
}
