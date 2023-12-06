import { GncDTO } from "src/containers/gnc/dto/gnc.dto";
import { LegalUserDTO } from "src/containers/legal-user/dto/legal-user.dto";
import { SmartphoneDTO } from "src/containers/smartphone/dto/smartphone.dto";
import { UserDTO } from "src/containers/user/dto/user.dto";
import { VehicleDTO } from "src/containers/vehicle/dto/vehicle.dto";
import { AssetDTO } from "./asset.dto";
import { ElectronicDTO } from "src/containers/electronic/dto/electronic.dto";

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
  legalUserDTO: LegalUserDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class AssetElectronicUser {
  userDTO: UserDTO;
  assetDTO: AssetDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  swornDeclaration: boolean;
}

export class AssetElectronicLegalUser {
  legalUserDTO: LegalUserDTO;
  assetDTO: AssetDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  swornDeclaration: boolean;
}

export class AssetsInspectionsUserDTO{
  userDTO: UserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class AssetsInspectionsLegalUserDTO{
  legalUserDTO: LegalUserDTO;
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}

export class AssetInspection{
  vehicleDTO: VehicleDTO;
  gncDTO: GncDTO;
  electronicDTO: ElectronicDTO;
  smartphoneDTO: SmartphoneDTO;
  assetDTO: AssetDTO;
  swornDeclaration: boolean;
}
