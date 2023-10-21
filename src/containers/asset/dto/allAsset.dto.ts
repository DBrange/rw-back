import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { UserDTO } from 'src/containers/users/dto/user.dto';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { AssetDTO } from './asset.dto';
import { LegalUsersDTO } from 'src/containers/legal-users/dto/legalUsers.dto';
import { ElectronicsDTO } from 'src/containers/electronics/dto/electronics.dto';
import { SmartphoneDTO } from 'src/containers/smartphones/dto/smartphone.dto';

export class AssetVehicleUserGncDTO {
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  userDTO: UserDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean
}

export class AssetVehicleLegalUserGncDTO {
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  legalUserDTO: LegalUsersDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class AssetElectronicUser {
  userDTO: UserDTO;
  assetDTO: AssetDTO;
  electronicDTO: ElectronicsDTO;
  smartphoneDTO: SmartphoneDTO;
  swornDeclaration: boolean;
}

export class AssetElectronicLegalUser {
  legalUserDTO: LegalUsersDTO;
  assetDTO: AssetDTO;
  electronicDTO: ElectronicsDTO;
  smartphoneDTO: SmartphoneDTO;
  swornDeclaration: boolean;
}

export class AssetsInspectionsUserDTO{
  userDTO: UserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicsDTO;
  smartphoneDTO: SmartphoneDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class AssetsInspectionsLegalUserDTO{
  legalUserDTO: LegalUsersDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicsDTO;
  smartphoneDTO: SmartphoneDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class AssetInspectionsInUser{
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicsDTO;
  smartphoneDTO: SmartphoneDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}
