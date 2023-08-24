import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { AssetDTO } from './dto/asset.dto';
import { GncService } from '../gnc/gnc.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { SmartphonesService } from '../smartphones/smartphones.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { UsersService } from '../users/users.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { UserDTO } from '../users/dto/user.dto';
import { VehicleDTO } from '../vehicle/dto/vehicle.dto';
import { GncDTO } from '../gnc/dto/gnc.dto';
import { LegalUsersDTO } from '../legal-users/dto/legalUsers.dto';
import { ElectronicsDTO } from '../electronics/dto/electronics.dto';
import { SmartphoneDTO } from '../smartphones/dto/smartphone.dto';
// import { ElectronicsDTO } from '../electronics/dto/electronics.dto';
// import { SmartphoneDTO } from '../smartphones/dto/smartphone.dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    private readonly vehicleService: VehicleService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphonesService,
    private readonly electronicService: ElectronicsService,
    private readonly userService: UsersService,
    private readonly legalUserService: LegalUsersService,
  ) {}

  public async createAsset(body: AssetDTO): Promise<Asset> {
    try {
      return await this.assetRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta vehicle + user
  public async CreateUserVehicle(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    userDTO: UserDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };

        await this.gncService.createGnc(vehicleGnc);
      }

      const newUser = await this.userService.createUser(userDTO);

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        users: newUser,
      };
      const newAsset = await this.assetRepository.save(fullAsset);

      const response = {
        userAsset: newAsset,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta vehicle + legalUser
  public async CreateLegalUserVehicle(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    legalUserDTO: LegalUsersDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newVehicle = await this.vehicleService.createVehicle(vehicleDTO);

      let newGnc;
      if (newVehicle.gnc) {
        const vehicleGnc = {
          ...gncDTO,
          vehicle: newVehicle.id,
        };
        newGnc = await this.gncService.createGnc(vehicleGnc);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      let legalAsset;
      if (newLegalUser && newVehicle) {
        const asset = {
          ...assetDTO,
          vehicle: newVehicle,
          legalUsers: newLegalUser,
        };

        legalAsset = await this.assetRepository.save(asset);
      }

      const response = {
        vehicle: newVehicle,
        gnc: newGnc,
        legalUser: newLegalUser,
        legalUserAsset: legalAsset,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta Electronics + user
  public async CreateUserElectronic(
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
    userDTO: UserDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      let newSmartphone;
      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartphoneDTO,
          electronics: newElectronic.id,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newUser = await this.userService.createUser(userDTO);

      let newAsset;
      if (newUser && newElectronic) {
        const fullAsset = {
          ...assetDTO,
          users: newUser,
          electronics: newElectronic,
        };
        newAsset = await this.assetRepository.save(fullAsset);
      }

      return { newElectronic, newSmartphone, newAsset };
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ruta Electronic + legalUser
  public async CreateLegalUserElectronic(
    electronicDTO: ElectronicsDTO,
    smartphoneDTO: SmartphoneDTO,
    legalUserDTO: LegalUsersDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      let newSmartphone;
      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartphoneDTO,
          electronics: newElectronic.id,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      let newAsset;
      if (newLegalUser && newElectronic) {
        const fullAsset = {
          ...assetDTO,
          legalUsers: newLegalUser,
          electronics: newElectronic,
        };
        newAsset = await this.assetRepository.save(fullAsset);
      }

      return { newElectronic, newSmartphone, newAsset };
    } catch (error) {
      throw new Error(error);
    }
  }
}
