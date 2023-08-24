import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sinister } from './entities/sinister.entity';
import { Repository } from 'typeorm';
import { SinisterDTO } from './dto/sinister.dto';
import { GncDTO } from '../gnc/dto/gnc.dto';
import { TheftTireDTO } from '../theft-tire/dto/theftTire.dto';
import { TheftDTO } from '../theft/dto/theft.dto';
import { UserDTO } from '../users/dto/user.dto';
import { VehicleDTO } from '../vehicle/dto/vehicle.dto';
import { AssetDTO } from '../asset/dto/asset.dto';
import { SinisterTypeService } from '../sinister-type/sinister-type.service';
import { AssetService } from '../asset/asset.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { GncService } from '../gnc/gnc.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { SmartphonesService } from '../smartphones/smartphones.service';
import { UsersService } from '../users/users.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { sinisterTypeDTO } from '../sinister-type/dto/sinisterType.dto';
import { TheftService } from '../theft/theft.service';
import { TheftTireService } from '../theft-tire/theft-tire.service';
import { FireService } from '../fire/fire.service';
import { FireDTO } from '../fire/dto/fire.dto';
import { InjuredDTO } from '../injured/dto/injured.dto';
import { InjuredService } from '../injured/injured.service';
import { InjuredInfoDTO } from '../injured-info/dto/injuredInfo.dto';
import { InjuredInfoService } from '../injured-info/injured-info.service';
import {
  InjuredData,
  ThirdParty,
  ThirdPartyVehicleData,
} from './dto/allSinister.dto';
import { Injured } from '../injured/entities/injured.entity';
import { CrashDTO } from '../crash/dto/crash.dto';
import { CrashService } from '../crash/crash.service';
import { ThirdPartyDriverDTO } from '../third-party-driver/dto/thirdPartyDriver.dto';
import { ThirdPartyVehicleDTO } from '../third-party-vehicle/dto/thirdPartyVehicle.dto';
import { ThirdPartyDriverService } from '../third-party-driver/third-party-driver.service';
import { ThirdPartyVehicleService } from '../third-party-vehicle/third-party-vehicle.service';
import { ThirdPartyVehicle } from '../third-party-vehicle/entities/thirdPartyVehicle.entity';
import { LegalUsersDTO } from '../legal-users/dto/legalUsers.dto';
import { Smartphone } from '../smartphones/entities/smartphone.entity';
import { SmartphoneDTO } from '../smartphones/dto/smartphone.dto';
import { ElectronicsDTO } from '../electronics/dto/electronics.dto';

@Injectable()
export class SinisterService {
  constructor(
    @InjectRepository(Sinister)
    private readonly sinisterRepository: Repository<Sinister>,
    private readonly userService: UsersService,
    private readonly legalUserService: LegalUsersService,
    private readonly vehicleService: VehicleService,
    private readonly electronicService: ElectronicsService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphonesService,
    private readonly assetService: AssetService,
    private readonly sinisterTypeService: SinisterTypeService,
    private readonly theftService: TheftService,
    private readonly theftTireService: TheftTireService,
    private readonly fireService: FireService,
    private readonly injuredService: InjuredService,
    private readonly injuredInfoService: InjuredInfoService,
    private readonly crashService: CrashService,
    private readonly thirdPartyVehicleService: ThirdPartyVehicleService,
    private readonly thirdPartyDriverService: ThirdPartyDriverService,
  ) {}

  public async createSinister(body: SinisterDTO): Promise<Sinister> {
    try {
      return await this.sinisterRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
  // User
  public async createUserVehicleTheft(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
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

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      const response = {
        sinister: newSinister,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createUserVehicleFire(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
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

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newFire = await this.fireService.createFire(fireDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: undefined,
        fire: newFire,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      let newInjured: InjuredDTO & Injured;

      if (newFire.thirdInjured) {
        const bodyInjured: InjuredDTO = {
          amount: injuredDTO.amount,
          injuredInfo: injuredDTO.injuredInfo,
          sinister: newSinister,
        };

        newInjured = await this.injuredService.createInjured(bodyInjured);

        const allPeopleInjured = injuredDTO.injuredInfo;

        for (let i = 0; i < allPeopleInjured.length; i++) {
          const el = allPeopleInjured[i];

          const bodyInjuredInfo: InjuredInfoDTO = {
            ...el,
            injured: newInjured,
          };
          await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
        }
      }

      const response = {
        injured: newInjured,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createUserVehicleCrash(
    userDTO: UserDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
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

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newCrash = await this.crashService.createCrash(crashDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: newCrash,
        fire: undefined,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      let newInjured: InjuredDTO & Injured;

      if (newCrash.thirdInjured) {
        const bodyInjured: InjuredDTO = {
          amount: injuredDTO.amount,
          injuredInfo: injuredDTO.injuredInfo,
          sinister: newSinister,
        };

        newInjured = await this.injuredService.createInjured(bodyInjured);

        const allPeopleInjured = injuredDTO.injuredInfo;

        for (let i = 0; i < allPeopleInjured.length; i++) {
          const el = allPeopleInjured[i];

          const bodyInjuredInfo: InjuredInfoDTO = {
            ...el,
            injured: newInjured,
          };
          await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
        }
      }

      let newThirdPartyVehicle: ThirdPartyVehicle;

      if (crashDTO.friendlyStatement) {
        const allThirdParty: ThirdParty =
          thirdPartyVehicleDTO.thirdPartyVehicleInfo;

        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];

          const bodyThirdPartyVehicle: ThirdPartyVehicleDTO = {
            brand: el.brand,
            model: el.model,
            year: el.year,
            plate: el.plate,
            insuranceCompany: el.insuranceCompany,
            insurancePolicy: el.insurancePolicy,
            ownerName: el.ownerLastName,
            ownerLastName: el.ownerLastName,
            ownerDni: el.ownerDni,
            sinister: newSinister,
          };

          newThirdPartyVehicle =
            await this.thirdPartyVehicleService.createThirdPartyVehicle(
              bodyThirdPartyVehicle,
            );

          const bodyThirdPartyDriver: ThirdPartyDriverDTO = {
            name: el.name,
            lastName: el.lastName,
            dni: el.dni,
            address: el.address,
            phoneNumber: el.phoneNumber,
            licensePhoto: el.licensePhoto,
            email: el.email,
            thirdPartyVehicle: newThirdPartyVehicle,
          };

          const newThirdPartyDriver =
            await this.thirdPartyDriverService.createThirdPartyDriver(
              bodyThirdPartyDriver,
            );
        }
      }

      const response = {
        thirdParty: newThirdPartyVehicle,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createUserElectronicTheft(
    userDTO: UserDTO,
    electronicDTO: ElectronicsDTO,
    smartPhoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartPhoneDTO,
          electronics: newElectronic.id,
        };

        await this.smartphoneService.createSmartphone(relatedSmartphone);
      }

      const newUser = await this.userService.createUser(userDTO);

      const fullAsset = {
        ...assetDTO,
        electronics: newElectronic,
        users: newUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      const response = {
        sinister: newSinister,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Legaluser
  public async createLegalUserVehicleTheft(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
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

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      const response = {
        sinister: newSinister,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createLegalUserVehicleFire(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
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

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newFire = await this.fireService.createFire(fireDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: undefined,
        fire: newFire,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      let newInjured: InjuredDTO & Injured;

      if (newFire.thirdInjured) {
        const bodyInjured: InjuredDTO = {
          amount: injuredDTO.amount,
          injuredInfo: injuredDTO.injuredInfo,
          sinister: newSinister,
        };

        newInjured = await this.injuredService.createInjured(bodyInjured);

        const allPeopleInjured = injuredDTO.injuredInfo;

        for (let i = 0; i < allPeopleInjured.length; i++) {
          const el = allPeopleInjured[i];

          const bodyInjuredInfo: InjuredInfoDTO = {
            ...el,
            injured: newInjured,
          };
          await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
        }
      }

      const response = {
        injured: newInjured,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createLegalUserVehicleCrash(
    legalUserDTO: LegalUsersDTO,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
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

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        vehicle: newVehicle,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newCrash = await this.crashService.createCrash(crashDTO);

      const bodySinisterType: sinisterTypeDTO = {
        crash: newCrash,
        fire: undefined,
        damage: undefined,
        theft: undefined,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      let newInjured: InjuredDTO & Injured;

      if (newCrash.thirdInjured) {
        const bodyInjured: InjuredDTO = {
          amount: injuredDTO.amount,
          injuredInfo: injuredDTO.injuredInfo,
          sinister: newSinister,
        };

        newInjured = await this.injuredService.createInjured(bodyInjured);

        const allPeopleInjured = injuredDTO.injuredInfo;

        for (let i = 0; i < allPeopleInjured.length; i++) {
          const el = allPeopleInjured[i];

          const bodyInjuredInfo: InjuredInfoDTO = {
            ...el,
            injured: newInjured,
          };
          await this.injuredInfoService.createInjuredInfo(bodyInjuredInfo);
        }
      }

      let newThirdPartyVehicle: ThirdPartyVehicle;

      if (crashDTO.friendlyStatement) {
        const allThirdParty: ThirdParty =
          thirdPartyVehicleDTO.thirdPartyVehicleInfo;

        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];

          const bodyThirdPartyVehicle: ThirdPartyVehicleDTO = {
            brand: el.brand,
            model: el.model,
            year: el.year,
            plate: el.plate,
            insuranceCompany: el.insuranceCompany,
            insurancePolicy: el.insurancePolicy,
            ownerName: el.ownerLastName,
            ownerLastName: el.ownerLastName,
            ownerDni: el.ownerDni,
            sinister: newSinister,
          };

          newThirdPartyVehicle =
            await this.thirdPartyVehicleService.createThirdPartyVehicle(
              bodyThirdPartyVehicle,
            );

          const bodyThirdPartyDriver: ThirdPartyDriverDTO = {
            name: el.name,
            lastName: el.lastName,
            dni: el.dni,
            address: el.address,
            phoneNumber: el.phoneNumber,
            licensePhoto: el.licensePhoto,
            email: el.email,
            thirdPartyVehicle: newThirdPartyVehicle,
          };

          const newThirdPartyDriver =
            await this.thirdPartyDriverService.createThirdPartyDriver(
              bodyThirdPartyDriver,
            );
        }
      }

      const response = {
        thirdParty: newThirdPartyVehicle,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createLegalUserElectronicTheft(
    legalUserDTO: LegalUsersDTO,
    electronicDTO: ElectronicsDTO,
    smartPhoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
  ) {
    try {
      const newElectronic = await this.electronicService.createElectronics(
        electronicDTO,
      );

      if (newElectronic.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartPhoneDTO,
          electronics: newElectronic.id,
        };

        await this.smartphoneService.createSmartphone(relatedSmartphone);
      }

      const newLegalUser = await this.legalUserService.createLegalUsers(
        legalUserDTO,
      );

      const fullAsset = {
        ...assetDTO,
        electronics: newElectronic,
        legalUsers: newLegalUser,
      };

      const newAsset = await this.assetService.createAsset(fullAsset);

      const currentDate = new Date('1998-03-03');
      const bodySinister: SinisterDTO = {
        date: currentDate,
        location: 'algun lugar del mas alla',
        time: '12:12',
        asset: newAsset,
      };

      const newSinister = await this.sinisterRepository.save(bodySinister);

      const newTheft = await this.theftService.createTheft(theftDTO);

      if (newTheft.isTire) {
        const theftTire = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        await this.theftTireService.createTheftTire(theftTire);
      }

      const bodySinisterType = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft,
        sinister: newSinister,
      };

      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      const response = {
        sinister: newSinister,
      };

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
