import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { AssetDTO } from 'src/containers/asset/dto/asset.dto';
import { AssetEntity } from 'src/containers/asset/entities/asset.entity';
import { AssetService } from 'src/containers/asset/services/asset.service';
import { CrashDTO } from 'src/containers/crash/dto/crash.dto';
import { CrashService } from 'src/containers/crash/services/crash.service';
import { DamageDTO } from 'src/containers/damage/dto/damage.dto';
import { DamageEntity } from 'src/containers/damage/entities/damage.entity';
import { DamageService } from 'src/containers/damage/services/damage.service';
import { ElectronicDTO } from 'src/containers/electronic/dto/electronic.dto';
import { ElectronicEntity } from 'src/containers/electronic/entities/electronic.entity';
import { ElectronicService } from 'src/containers/electronic/services/electronic.service';
import { FireDTO } from 'src/containers/fire/dto/fire.dto';
import { FireService } from 'src/containers/fire/services/fire.service';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { GncService } from 'src/containers/gnc/services/gnc.service';
import { InjuredInfoDTO } from 'src/containers/injured-info/dto/injured-info.dto';
import { InjuredInfoService } from 'src/containers/injured-info/services/injured-info.service';
import { InjuredDTO } from 'src/containers/injured/dto/injured.dto';
import { InjuredEntity } from 'src/containers/injured/entities/injured.entity';
import { InjuredService } from 'src/containers/injured/services/injured.service';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { NotificationDTO } from 'src/containers/notification/dto/notification.dto';
import { NotificationService } from 'src/containers/notification/services/notification.service';
import { SinisterTypeDTO } from 'src/containers/sinister-type/dto/sinister-type.dto';
import { SinisterTypeEntity } from 'src/containers/sinister-type/entities/sinister-type.entity';
import { SinisterTypeService } from 'src/containers/sinister-type/services/sinister-type.service';
import { SmartphoneDTO } from 'src/containers/smartphone/dto/smartphone.dto';
import { SmartphoneEntity } from 'src/containers/smartphone/entities/smartphone.entity';
import { SmartphoneService } from 'src/containers/smartphone/services/smartphone.service';
import { TheftTireDTO } from 'src/containers/theft-tire/dto/theft-tire.dto';
import { TheftTireEntity } from 'src/containers/theft-tire/entities/theft-tire.entity';
import { TheftTireService } from 'src/containers/theft-tire/services/theft-tire.service';
import { TheftDTO } from 'src/containers/theft/dto/theft.dto';
import { TheftEntity } from 'src/containers/theft/entities/theft.entity';
import { TheftService } from 'src/containers/theft/services/theft.service';
import { ThirdPartyDriverDTO } from 'src/containers/third-party-driver/dto/third-party-driver.dto';
import { ThirdPartyDriverService } from 'src/containers/third-party-driver/services/third-party-driver.service';
import { ThirdPartyVehicleDTO } from 'src/containers/third-party-vehicle/dto/third-party-vehicle.dto';
import { ThirdPartyVehicleService } from 'src/containers/third-party-vehicle/services/third-party-vehicle.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { VehicleEntity } from 'src/containers/vehicle/entities/vehicle.entity';
import { VehicleService } from 'src/containers/vehicle/services/vehicle.service';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  InjuredData,
  ThirdParty,
  ThirdPartyVehicleData,
} from '../dto/all-sinister.dto';
import { SinisterDTO, UpdateSinisterDTO } from '../dto/sinister.dto';
import { SinisterEntity } from '../entities/sinister.entity';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { DateData } from 'src/containers/user/interfaces/user.interface';

@Injectable()
export class SinisterService {
  constructor(
    @InjectRepository(SinisterEntity)
    private readonly sinisterRepository: Repository<SinisterEntity>,
    private readonly userService: UserService,
    private readonly legalUserService: LegalUserService,
    private readonly vehicleService: VehicleService,
    private readonly electronicService: ElectronicService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphoneService,
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
    private readonly damageService: DamageService,
    private readonly userBrokerService: UserBrokerService,
    private readonly notificationService: NotificationService,
  ) {}

  public async createSinister(body: SinisterDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.sinisterRepository.save(body);
      // return { message: 'The sinister has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSinisters(): Promise<SinisterEntity[]> {
    try {
      const sinisters: SinisterEntity[] = await this.sinisterRepository.find();

      return sinisters;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSinisterById(id: string) {
    try {
      const sinister = await this.sinisterRepository
        .createQueryBuilder('sinisters')
        .where({ id })
        .leftJoinAndSelect('sinisters.asset', 'asset')
        .leftJoinAndSelect('asset.vehicle', 'vehicle')
        .leftJoinAndSelect('vehicle.gncId', 'gncId')
        .leftJoinAndSelect('asset.electronic', 'electronic')
        .leftJoinAndSelect('electronic.smartphone', 'smartphone')
        .leftJoinAndSelect('asset.sinisters', 'sinisterss')
        .leftJoinAndSelect('asset.client', 'client')
        .leftJoinAndSelect('client.personalUser', 'personalUser')
        .leftJoinAndSelect('client.legalUser', 'legalUser')
        .leftJoinAndSelect('sinisters.thirdPartyVehicle', 'thirdPartyVehicle')
        .leftJoinAndSelect(
          'thirdPartyVehicle.thirdPartyDriver',
          'thirdPartyDriver',
        )
        .leftJoinAndSelect('sinisters.injuredd', 'injuredd')
        .leftJoinAndSelect('injuredd.injuredsInfo', 'injuredsInfo')
        .leftJoinAndSelect('sinisters.sinisterType', 'sinisterType')
        .leftJoinAndSelect('sinisterType.theft', 'theft')
        .leftJoinAndSelect('theft.theftTire', 'theftTire')
        .leftJoinAndSelect('sinisterType.fire', 'fire')
        .leftJoinAndSelect('sinisterType.crash', 'crash')
        .leftJoinAndSelect('sinisterType.damage', 'damage')
        .getOne();

      if (!sinister) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No sinisters found',
        });
      }
      return sinister;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateSinister(
    id: string,
    body: UpdateSinisterDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedSinister = await this.sinisterRepository.update(id, body);
      if (updatedSinister.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No sinisters were updated',
        });
      }

      return updatedSinister;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteSinister(id: string): Promise<DeleteResult> {
    try {
      const sinister: DeleteResult = await this.sinisterRepository.delete(id);

      if (!sinister) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete sinister',
        });
      }

      return sinister;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  private async sinisterInfo(info: TheftDTO | FireDTO | CrashDTO | DamageDTO) {
    try {
      const date = info.date;
      const location = info.location;
      const time = info.time;

      return { date, location, time };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  private async createInjuredInSinister(
    thirdInjured: boolean,
    injuredDTO: InjuredData,
    newSinister: SinisterEntity,
  ) {
    try {
      let newInjured: InjuredEntity;

      if (thirdInjured && injuredDTO.amount) {
        const bodyInjured: InjuredDTO = {
          amount: injuredDTO.amount,
          injuredInfo: injuredDTO.injuredInfo,
          sinister: newSinister.id,
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
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  private async vehicleSinisterNotification(
    newVehicle: VehicleDTO,
    clientId: string,
    brokerId: string,
    type: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Denuncia',
      message: `Se ha realizado una nueva denuncia por ${type} - ${newVehicle.plate}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Denuncia',
      message: `Se ha realizado una nueva denuncia por ${type} - ${newVehicle.plate}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);
  }

  private async electronicSinisterNotification(
    newElectronic: ElectronicDTO,
    clientId: string,
    brokerId: string,
    type: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Denuncia',
      message: `Se ha realizado una nueva denuncia por ${type} - ${newElectronic.brand} ${newElectronic.model}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Denuncia',
      message: `Se ha realizado una nueva denuncia por ${type} - ${newElectronic.brand} ${newElectronic.model}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - -

  // Theft

  private async createTheftInSinister(
    asset: AssetEntity,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
  ) {
    try {
      const newTheft: TheftEntity = await this.theftService.createTheft(
        theftDTO,
      );
      let theftTireId: TheftTireEntity | null;
      if (newTheft.isTire) {
        const theftTire: TheftTireDTO = {
          ...theftTireDTO,
          theft: newTheft.id,
        };

        theftTireId = await this.theftTireService.createTheftTire(theftTire);
      }

      if (theftTireId) {
        await this.theftService.updateTheft(newTheft.id, {
          ...newTheft,
          theftTire: theftTireId.id,
        });
      }

      const bodySinisterType: SinisterTypeDTO = {
        crash: undefined,
        fire: undefined,
        damage: undefined,
        theft: newTheft.id,
      };

      const newSinisterType: SinisterTypeEntity =
        await this.sinisterTypeService.createSinisterType(bodySinisterType);

      const { date, location, time } = await this.sinisterInfo(theftDTO);

      const bodySinister: SinisterDTO = {
        date,
        location,
        time,
        asset: asset,
        sinisterType: newSinisterType,
      };

      const newSinister = await this.createSinister(bodySinister);

      return newSinister;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSinisterTheft(
    brokerId: string,
    clientId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    electronicDTO: ElectronicDTO,
    smartphoneDTO: SmartphoneDTO,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      if (vehicleDTO) {
        const newAsset: AssetEntity =
          await this.assetService.createVehicleInAsset(
            vehicleDTO,
            gncDTO,
            assetDTO,
            brokerId,
            clientId,
            false,
          );

        await this.createTheftInSinister(newAsset, theftDTO, theftTireDTO);

        await this.vehicleSinisterNotification(
          vehicleDTO,
          clientId,
          brokerId,
          'robo',
        );
      } else {
        const newAsset: AssetEntity =
          await this.assetService.createElectronicInAsset(
            electronicDTO,
            smartphoneDTO,
            assetDTO,
            brokerId,
            clientId,
            false,
          );

        await this.createTheftInSinister(newAsset, theftDTO, theftTireDTO);

        await this.electronicSinisterNotification(
          electronicDTO,
          clientId,
          brokerId,
          'robo',
        );
      }

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // With inspection

  public async createSinisterTheftInInspection(
    brokerId: string,
    clientId: string,
    assetId: string,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      const asset = (await this.assetService.getAssets()).find(
        (asset) => asset?.id === assetId,
      );

      await this.createTheftInSinister(asset, theftDTO, theftTireDTO);

      const vehicleEntity = (await this.assetService.getAssetById(asset.id))
        .vehicle as unknown as VehicleEntity;

      await this.vehicleSinisterNotification(
        vehicleEntity,
        clientId,
        brokerId,
        'robo',
      );

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - -

  //Fire

  private async createFireInSinister(
    asset: AssetEntity,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
  ) {
    try {
      const newFire = await this.fireService.createFire(fireDTO);

      const bodySinisterType: SinisterTypeDTO = {
        crash: undefined,
        fire: newFire.id,
        damage: undefined,
        theft: undefined,
      };

      //newSinisterType
      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      const { date, location, time } = await this.sinisterInfo(fireDTO);

      const bodySinister: SinisterDTO = {
        date,
        location,
        time,
        asset: asset,
        sinisterType: newSinisterType,
      };

      const newSinister = await this.createSinister(bodySinister);

      if (injuredDTO) {
        await this.createInjuredInSinister(
          newFire.thirdInjured,
          injuredDTO,
          newSinister,
        );
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSinisterFire(
    brokerId: string,
    clientId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      const newAsset: AssetEntity =
        await this.assetService.createVehicleInAsset(
          vehicleDTO,
          gncDTO,
          assetDTO,
          brokerId,
          clientId,
          false,
        );

      // NewSinister
      await this.createFireInSinister(newAsset, fireDTO, injuredDTO);

      await this.vehicleSinisterNotification(
        vehicleDTO,
        clientId,
        brokerId,
        'incendio',
      );

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // With inspection
  public async createSinisterFireInInspection(
    brokerId: string,
    clientId: string,
    assetId: string,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      const asset = (await this.assetService.getAssets()).find(
        (asset) => asset.id === assetId,
      );

      await this.createFireInSinister(asset, fireDTO, injuredDTO);

      const vehicleEntity = (await this.assetService.getAssetById(asset.id))
        .vehicle as unknown as VehicleEntity;

      await this.vehicleSinisterNotification(
        vehicleEntity,
        clientId,
        brokerId,
        'incendio',
      );

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - -

  // Crash

  private async createThirdPartyInSinister(
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
    newSinister: SinisterEntity,
  ) {
    try {
      const thirdPartyVehicleEmails: string[] = [];

      const allThirdParty: ThirdParty =
        thirdPartyVehicleDTO.thirdPartyVehicleInfo;
      if (allThirdParty) {
        for (let i = 0; i < allThirdParty.length; i++) {
          const el = allThirdParty[i];
          thirdPartyVehicleEmails.push(el.email);

          const bodyThirdPartyDriver: ThirdPartyDriverDTO = {
            name: el.name,
            lastName: el.lastName,
            dni: el.dni,
            address: el.address,
            phoneNumber: el.phoneNumber,
            licensePhoto: el.licensePhoto,
            email: el.email,
            // thirdPartyVehicle: newThirdPartyVehicle,
          };

          //newThirdPartyDriver
          const newThirdPartyDriver =
            await this.thirdPartyDriverService.createThirdPartyDriver(
              bodyThirdPartyDriver,
            );

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
            thirdPartyDriver: newThirdPartyDriver.id,
            sinister: newSinister.id,
          };

          //newThirdPartyVehicle
          await this.thirdPartyVehicleService.createThirdPartyVehicle(
            bodyThirdPartyVehicle,
          );
        }
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  private async createCrashInSinister(
    asset: AssetEntity,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
  ) {
    try {
      const newCrash = await this.crashService.createCrash(crashDTO);

      const bodySinisterType: SinisterTypeDTO = {
        crash: newCrash.id,
        fire: undefined,
        damage: undefined,
        theft: undefined,
      };

      //newSinisterType
      const newSinisterType = await this.sinisterTypeService.createSinisterType(
        bodySinisterType,
      );

      const { date, location, time } = await this.sinisterInfo(crashDTO);

      const bodySinister: SinisterDTO = {
        date,
        location,
        time,
        asset: asset,
        sinisterType: newSinisterType,
      };

      const newSinister = await this.createSinister(bodySinister);

      if (injuredDTO) {
        await this.createInjuredInSinister(
          newCrash.thirdInjured,
          injuredDTO,
          newSinister,
        );
      }

      await this.createThirdPartyInSinister(thirdPartyVehicleDTO, newSinister);

      return newSinister;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSinisterCrash(
    brokerId: string,
    clientId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      const newAsset: AssetEntity =
        await this.assetService.createVehicleInAsset(
          vehicleDTO,
          gncDTO,
          assetDTO,
          brokerId,
          clientId,
          false,
        );

      await this.createCrashInSinister(
        newAsset,
        crashDTO,
        injuredDTO,
        thirdPartyVehicleDTO,
      );

      await this.vehicleSinisterNotification(
        vehicleDTO,
        clientId,
        brokerId,
        'choque',
      );
      return { message: 'La denuncia a sido realizada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // With inspection
  public async createSinisterCrashInInspection(
    brokerId: string,
    clientId: string,
    assetId: string,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      const asset = (await this.assetService.getAssets()).find(
        (asset) => asset.id === assetId,
      );

      await this.createCrashInSinister(
        asset,
        crashDTO,
        injuredDTO,
        thirdPartyVehicleDTO,
      );

      const vehicleEntity = (await this.assetService.getAssetById(asset.id))
        .vehicle as unknown as VehicleEntity;

      await this.vehicleSinisterNotification(
        vehicleEntity,
        clientId,
        brokerId,
        'choque',
      );

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - -

  // Damage

  private async createDamageInSinister(
    asset: AssetEntity,
    damageDTO: DamageDTO,
  ) {
    try {
      const newDamage: DamageEntity = await this.damageService.createDamage(
        damageDTO,
      );

      const bodySinisterType: SinisterTypeDTO = {
        crash: undefined,
        fire: undefined,
        damage: newDamage.id,
        theft: undefined,
      };

      //newSinisterType
      const newSinisterType: SinisterTypeEntity =
        await this.sinisterTypeService.createSinisterType(bodySinisterType);

      const { date, location, time } = await this.sinisterInfo(damageDTO);

      const bodySinister: SinisterDTO = {
        date,
        location,
        time,
        asset: asset,
        sinisterType: newSinisterType,
      };

      const newSinister = await this.createSinister(bodySinister);

      return newSinister;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSinisterDamage(
    brokerId: string,
    clientId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    electronicDTO: ElectronicDTO,
    smartphoneDTO: SmartphoneDTO,
    damageDTO: DamageDTO,
    assetDTO: AssetDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      if (vehicleDTO) {
        const newAsset: AssetEntity =
          await this.assetService.createVehicleInAsset(
            vehicleDTO,
            gncDTO,
            assetDTO,
            brokerId,
            clientId,
            false,
          );
        const sinister = await this.createDamageInSinister(newAsset, damageDTO);

        await this.vehicleSinisterNotification(
          vehicleDTO,
          clientId,
          brokerId,
          'daño',
        );

        return sinister;
      } else {
        const newAsset: AssetEntity =
          await this.assetService.createElectronicInAsset(
            electronicDTO,
            smartphoneDTO,
            assetDTO,
            brokerId,
            clientId,
            false,
          );

        const sinister = await this.createDamageInSinister(newAsset, damageDTO);

        await this.electronicSinisterNotification(
          electronicDTO,
          clientId,
          brokerId,
          'daño',
        );

        return sinister;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // With inspection
  public async createSinisterDamageInInspection(
    brokerId: string,
    clientId: string,
    assetId: string,
    damageDTO: DamageDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }

      const asset = (await this.assetService.getAssets()).find(
        (asset) => asset.id === assetId,
      );

      await this.createDamageInSinister(asset, damageDTO);

      const vehicleEntity = (await this.assetService.getAssetById(asset.id))
        .vehicle as unknown as VehicleEntity;

      await this.vehicleSinisterNotification(
        vehicleEntity,
        clientId,
        brokerId,
        'daño',
      );

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - -

  //Get sinsiters

  // Client
  public async getSinistersOfClient(
    clientId: string,
    searchField: string,
    typeToFilter: string,
    typeToFilterReport: string,
    page: number,
    limit: number,
  ) {
    try {
      const clientsBrokerAssets = (await this.userService.getUserById(clientId))
        .brokerAssets as unknown as AssetEntity[];

      const assetsForSinisters: AssetEntity[] = clientsBrokerAssets
        .map((asset) => {
          if (asset.sinisters?.length) {
            let assets = [];

            for (let i = 0; i < asset.sinisters.length; i++) {
              assets = [...assets, asset.sinisters[i]];
            }

            return assets;
          } else if (!asset.inspection) {
            return asset;
          }
        })
        .flat();

      const sinisterPromises = assetsForSinisters.map(async (brokerAssets) => {
        const sinister = await this.sinisterForArrayPromisesBySinisterId(
          brokerAssets?.id,
        );

        return sinister;
      });

      const sinistersWithoutNull = (
        await Promise.all(sinisterPromises)
      ).flatMap((sinister) => (!sinister ? [] : sinister));

      const regex = new RegExp(`^${searchField}`, 'i');

      const filteredSinisters = sinistersWithoutNull.filter((sinister) => {
        if (typeToFilter === 'vehicle' && sinister.asset.vehicle) {
          const filterByTypeReport =
            !typeToFilterReport ||
            (typeToFilterReport === 'theft' && sinister.sinisterType.theft) ||
            (typeToFilterReport === 'fire' && sinister.sinisterType.fire) ||
            (typeToFilterReport === 'crash' && sinister.sinisterType.crash) ||
            (typeToFilterReport === 'damage' && sinister.sinisterType.damage);
          return (
            filterByTypeReport &&
            sinister.asset.vehicle.plate
              .toLowerCase()
              .includes(searchField.toLowerCase())
          );
        } else if (typeToFilter === 'electronic' && sinister.asset.electronic) {
          const filterByTypeReport =
            !typeToFilterReport ||
            (typeToFilterReport === 'theft' && sinister.sinisterType.theft) ||
            (typeToFilterReport === 'damage' && sinister.sinisterType.damage);

          const electronic = sinister.asset
            .electronic as unknown as ElectronicEntity;

          return (
            filterByTypeReport &&
            (electronic.model
              .toLowerCase()
              .includes(searchField.toLowerCase()) ||
              (electronic.smartphone as unknown as SmartphoneEntity).imei
                .toLowerCase()
                .includes(searchField.toLowerCase()))
          );
        }

        return false;
      });

      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedSinisters = filteredSinisters.slice(start, end);

      return paginatedSinisters;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // Broker

  private async sinisterForArrayPromises(assetId: string) {
    const sinister = await this.sinisterRepository
      .createQueryBuilder('sinisters')
      // .where({ id: sinisterId })
      .where({ asset: assetId })
      .leftJoinAndSelect('sinisters.sinisterType', 'sinisterType')
      .leftJoin('sinisterType.theft', 'theft')
      .addSelect('theft.id')
      .leftJoin('sinisterType.fire', 'fire')
      .addSelect('fire.id')
      .leftJoin('sinisterType.crash', 'crash')
      .addSelect('crash.id')
      .leftJoin('sinisterType.damage', 'damage')
      .addSelect('damage.id')
      .leftJoinAndSelect('sinisters.asset', 'asset')
      .leftJoin('asset.vehicle', 'vehicle')
      .addSelect('vehicle.id')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('asset.electronic', 'electronic')
      .addSelect('electronic.id')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .getOne();

    return sinister;
  }
  private async sinisterForArrayPromisesBySinisterId(sinisterId: string) {
    const sinister = await this.sinisterRepository
      .createQueryBuilder('sinisters')
      .where({ id: sinisterId })
      // .where({ asset: assetId })
      .leftJoinAndSelect('sinisters.sinisterType', 'sinisterType')
      .leftJoin('sinisterType.theft', 'theft')
      .addSelect('theft.id')
      .leftJoin('sinisterType.fire', 'fire')
      .addSelect('fire.id')
      .leftJoin('sinisterType.crash', 'crash')
      .addSelect('crash.id')
      .leftJoin('sinisterType.damage', 'damage')
      .addSelect('damage.id')
      .leftJoinAndSelect('sinisters.asset', 'asset')
      .leftJoin('asset.vehicle', 'vehicle')
      .addSelect('vehicle.id')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('asset.electronic', 'electronic')
      .addSelect('electronic.id')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .getOne();

    return sinister;
  }

  public async getSinistersOfBroker(
    brokerId: string,
    searchField: string,
    typeToFilter: string,
    typeToFilterReport: string,
    page: number,
    limit: number,
  ) {
    try {
      const brokerAssets = (await this.userService.getUserById(brokerId))
        .assets as unknown as AssetEntity[];

      const assetsForSinisters: AssetEntity[] = brokerAssets
        .map((asset) => {
          if (asset.sinisters.length) {
            let assets = [];

            for (let i = 0; i < asset.sinisters.length; i++) {
              assets = [...assets, asset.sinisters[i]];
            }

            return assets;
          } else if (!asset.inspection) {
            return asset;
          }
        })
        .flat();

      const sinisterPromises = assetsForSinisters.map(async (brokerAssets) => {
        const sinister = await this.sinisterForArrayPromisesBySinisterId(
          brokerAssets?.id,
        );

        return sinister;
      });

      const sinisters = (await Promise.all(sinisterPromises)).flatMap(
        (sinister) => (!sinister ? [] : sinister),
      );

      const sinistersWithoutNull = sinisters.flat().filter(Boolean);

      const filteredSinisters = sinistersWithoutNull.filter((sinister) => {
        if (typeToFilter === 'vehicle' && sinister.asset.vehicle) {
          const vehicle = sinister.asset.vehicle as unknown as VehicleEntity;

          const filterByTypeReport =
            !typeToFilterReport ||
            (typeToFilterReport === 'theft' && sinister.sinisterType.theft) ||
            (typeToFilterReport === 'fire' && sinister.sinisterType.fire) ||
            (typeToFilterReport === 'crash' && sinister.sinisterType.crash) ||
            (typeToFilterReport === 'damage' && sinister.sinisterType.damage);
          return (
            filterByTypeReport &&
            vehicle.plate.toLowerCase().includes(searchField.toLowerCase())
          );
        } else if (typeToFilter === 'electronic' && sinister.asset.electronic) {
          const electronic = sinister.asset
            .electronic as unknown as ElectronicEntity;

          const filterByTypeReport =
            !typeToFilterReport ||
            (typeToFilterReport === 'theft' && sinister.sinisterType.theft) ||
            (typeToFilterReport === 'damage' && sinister.sinisterType.damage);

          return (
            filterByTypeReport &&
            (electronic.model
              .toLowerCase()
              .includes(searchField.toLowerCase()) ||
              (electronic.smartphone as unknown as SmartphoneEntity).imei
                .toLowerCase()
                .includes(searchField.toLowerCase()))
          );
        }

        return false;
      });

      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedSinisters = filteredSinisters.slice(start, end);

      return paginatedSinisters;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // public async getSinistersOfClients(userBrokerId: string) {
  //   const clients = (await this.userBrokerService.getUserBrokerById(
  //     userBrokerId,
  //   )) as unknown as UserBrokerEntity;

  //   const allUserSinistersPromises = (
  //     clients.clients as unknown as UserEntity[]
  //   ).map(async (client) => await this.getSinistersOfBroker(client.id));

  //   const allSinisters = (
  //     await Promise.all([...allUserSinistersPromises])
  //   ).flat();

  //   return allSinisters;
  // }

  // Element sinister

  private async createSinisterFromElement(
    asset: AssetEntity,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    fireDTO: FireDTO,
    injuredDTO: InjuredData,
    crashDTO: CrashDTO,
    damageDTO: DamageDTO,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
  ) {
    try {
      if (theftDTO) {
        return await this.createTheftInSinister(asset, theftDTO, theftTireDTO);
      } else if (fireDTO) {
        return await this.createFireInSinister(asset, fireDTO, injuredDTO);
      } else if (crashDTO) {
        return await this.createCrashInSinister(
          asset,
          crashDTO,
          injuredDTO,
          thirdPartyVehicleDTO,
        );
      } else if (damageDTO) {
        return await this.createDamageInSinister(asset, damageDTO);
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSinisterInElement(
    elementId: string,
    theftDTO: TheftDTO,
    theftTireDTO: TheftTireDTO,
    fireDTO: FireDTO,
    crashDTO: CrashDTO,
    injuredDTO: InjuredData,
    thirdPartyVehicleDTO: ThirdPartyVehicleData,
    damageDTO: DamageDTO,
    swornDeclaration: boolean,
  ) {
    try {
      if (!swornDeclaration) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Without sworn declaration',
        });
      }
      const findVehicle = (await this.vehicleService.getVehicles()).find(
        (vehi) => vehi.id === elementId,
      );

      if (findVehicle) {
        const asset: AssetEntity = findVehicle.asset as unknown as AssetEntity;

        await this.createSinisterFromElement(
          asset,
          theftDTO,
          theftTireDTO,
          fireDTO,
          injuredDTO,
          crashDTO,
          damageDTO,
          thirdPartyVehicleDTO,
        );
      } else {
        const asset: AssetEntity = (
          await this.electronicService.getElectronicById(elementId)
        ).asset as unknown as AssetEntity;

        await this.createSinisterFromElement(
          asset,
          theftDTO,
          theftTireDTO,
          fireDTO,
          injuredDTO,
          crashDTO,
          damageDTO,
          thirdPartyVehicleDTO,
        );
      }

      return { message: 'La denuncia ha sido creada con exito' };
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - -

  // Get Client Detail
  // private async findSinistersByBrokerClient(
  //   brokerId: string,
  //   clientId: string,
  // ) {
  //       const sinisters = await this.sinisterRepository.find({
  //         where: {
  //           user: brokerId,
  //           client: clientId,
  //         },
  //       });

  //       return assets;
  // }

  public async getClientInBroker(brokerId: string, clientId: string) {
    const client = await this.userService.getClientById(clientId);
    const assetOfUser = await this.assetService.findAssetsByBrokerClient(
      brokerId,
      clientId,
    );

    const { password, ...rest } = client;

    const assets = assetOfUser.filter((asset) => asset.inspection);
    const assetsForSinisters: AssetEntity[] = assetOfUser
      .map((asset) => {
        if (asset.sinisters.length) {
          let assets = [];

          for (let i = 0; i < asset.sinisters.length; i++) {
            assets = [...assets, asset.sinisters[i]];
          }

          return assets;
        } else if (!asset.inspection) {
          return asset;
        }
      })
      .flat();

    const sinisterPromises = assetsForSinisters.map(async (brokerAssets) => {
      const sinister = await this.sinisterForArrayPromisesBySinisterId(
        brokerAssets?.id,
      );

      return sinister;
    });

    const sinisters = (await Promise.all(sinisterPromises)).flatMap(
      (sinister) => (!sinister ? [] : sinister),
    );

    return { ...rest, assets, sinisters };
  }

  private async getAssetForBroker(brokerId: string, userBrokerId: string) {
    const clients = (await this.assetService.getAllClientsInBrokerr(
      userBrokerId,
    )) as unknown as UserEntity[];

    const assetOfBroker = await this.assetService.findAssetsByBroker(brokerId);

    const assets = assetOfBroker.filter((asset) => asset.inspection);
    const assetsForSinisters: AssetEntity[] = assetOfBroker
      .map((asset) => {
        if (asset.sinisters?.length) {
          let assets = [];

          for (let i = 0; i < asset.sinisters?.length; i++) {
            assets = [...assets, asset.sinisters[i]];
          }

          return assets;
        } else if (!asset.inspection) {
          return asset;
        }
      })
      .flat();

    const sinisterPromises = assetsForSinisters.map(async (brokerAssets) => {
      const sinister = await this.sinisterForArrayPromisesBySinisterId(
        brokerAssets?.id,
      );

      return sinister;
    });

    const sinisters = (await Promise.all(sinisterPromises)).flatMap(
      (sinister) => (!sinister ? [] : sinister),
    );
    return { assets, sinisters, clients };
  }

  public async getBrokerDashboard(brokerId: string, userBrokerId: string) {
    const { assets, sinisters, clients } = await this.getAssetForBroker(
      brokerId,
      userBrokerId,
    );
    const date = (date: Date) => new Date(date).getTime();
    // Obtén la fecha actual
    const currentDate = new Date();
    const newAsyncDate = new Date();

    // Calcula la fecha de hace una semana
    const lastWeekDate = new Date(currentDate);
    lastWeekDate.setDate(currentDate.getDate() - 7);

    // Función para obtener el timestamp de una fecha
    const dateToTimestamp = (date: Date) => date.getTime();

    // Filtra los assets creados en la última semana
    const assetsLastWeek = assets
      .filter(
        (el) =>
          dateToTimestamp(new Date(el.created_at)) >=
          dateToTimestamp(lastWeekDate),
      )
      .sort((a, b) => date(b.created_at) - date(a.created_at))
      .slice(0, 5);

    const sinistersLastWeek = sinisters
      .filter(
        (el) =>
          dateToTimestamp(new Date(el.created_at)) >=
          dateToTimestamp(lastWeekDate),
      )
      .sort((a, b) => date(b.created_at) - date(a.created_at))
      .slice(0, 5);

    const clientsLastWeek = clients
      .filter(
        (el) =>
          dateToTimestamp(new Date(el.created_at)) >=
          dateToTimestamp(lastWeekDate),
      )
      .sort((a, b) => date(b.created_at) - date(a.created_at))
      .slice(0, 5);

    return { assetsLastWeek, sinistersLastWeek, clientsLastWeek, newAsyncDate };
  }

  //-----------------------------------------
  // Admin
  public async getBrokerDetailForAdmin(userId: string) {
    const user = await this.userService.getBrokerById(userId);

    if (!user.userBroker) {
      const broAssets = user?.brokerAssets as unknown as AssetEntity[];
      const { password, brokerAssets, ...rest } = user;

      const assetsForSinisters: AssetEntity[] = broAssets
        ?.map((asset) => {
          if (asset.sinisters?.length) {
            let assets = [];

            for (let i = 0; i < asset.sinisters?.length; i++) {
              assets = [...assets, asset.sinisters[i]];
            }

            return assets;
          } else if (!asset.inspection) {
            return asset;
          }
        })
        .flat();

      const sinisterPromises = assetsForSinisters?.map(async (brokerAssets) => {
        const sinister = await this.sinisterForArrayPromisesBySinisterId(
          brokerAssets?.id,
        );

        return sinister;
      });
      // console.log(assetsForSinisters);
      const sinisters = (await Promise.all(sinisterPromises))?.flatMap(
        (sinister) => (!sinister ? [] : sinister),
      );

      return { ...rest, sinisters };
    }
    const broAssets = user.assets as unknown as AssetEntity[];

    const { password, assets: brokerAsset, brokerAssets, ...rest } = user;

    const assets = broAssets?.filter((asset) => asset.inspection);
    const assetsForSinisters: AssetEntity[] = broAssets
      ?.map((asset) => {
        if (asset.sinisters?.length) {
          let assets = [];

          for (let i = 0; i < asset.sinisters?.length; i++) {
            assets = [...assets, asset.sinisters[i]];
          }

          return assets;
        } else if (!asset.inspection) {
          return asset;
        }
      })
      .flat();

    const sinisterPromises = assetsForSinisters?.map(async (brokerAssets) => {
      const sinister = await this.sinisterForArrayPromisesBySinisterId(
        brokerAssets?.id,
      );

      return sinister;
    });

    const sinisters = (await Promise.all(sinisterPromises))?.flatMap(
      (sinister) => (!sinister ? [] : sinister),
    );

    return { ...rest, assets, sinisters };
  }

  private async geSinisterOfUsers() {
    const client = await this.sinisterRepository
      .createQueryBuilder('sinisters')
      .leftJoin('sinisters.asset', 'asset')
      .leftJoin('asset.vehicle', 'vehicle')
      .addSelect('vehicle.id')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('asset.electronic', 'electronic')
      .addSelect('electronic.id')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .leftJoin('electronic.smartphone', 'smartphone')
      .addSelect('smartphone.imei')
      .getMany();

    if (!client) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No users found',
      });
    }

    return client;
  }

  public async getSinistersForAdmin(
    searchField: string,
    typeToFilter: string,
    typeToFilterReport: string,
    page: number,
    limit: number,
  ) {
    try {
      const sinisterss = await this.geSinisterOfUsers();
      // console.log(sinisterss);
      const sinisterPromises = sinisterss.map(async (sin) => {
        const sinister = await this.sinisterForArrayPromisesBySinisterId(
          sin?.id,
        );

        return sinister;
      });

      const sinisters = (await Promise.all(sinisterPromises)).flatMap(
        (sinister) => (!sinister ? [] : sinister),
      );

      const sinistersWithoutNull = sinisters.flat().filter(Boolean);

      const filteredSinisters = sinistersWithoutNull.filter((sinister) => {
        if (typeToFilter === 'vehicle' && sinister.asset.vehicle) {
          const vehicle = sinister.asset.vehicle as unknown as VehicleEntity;

          const filterByTypeReport =
            !typeToFilterReport ||
            (typeToFilterReport === 'theft' && sinister.sinisterType.theft) ||
            (typeToFilterReport === 'fire' && sinister.sinisterType.fire) ||
            (typeToFilterReport === 'crash' && sinister.sinisterType.crash) ||
            (typeToFilterReport === 'damage' && sinister.sinisterType.damage);
          return (
            filterByTypeReport &&
            vehicle.plate.toLowerCase().includes(searchField.toLowerCase())
          );
        } else if (typeToFilter === 'electronic' && sinister.asset.electronic) {
          const electronic = sinister.asset
            .electronic as unknown as ElectronicEntity;
          const filterByTypeReport =
            !typeToFilterReport ||
            (typeToFilterReport === 'theft' && sinister.sinisterType.theft) ||
            (typeToFilterReport === 'damage' && sinister.sinisterType.damage);

          return (
            filterByTypeReport &&
            (electronic.model
              .toLowerCase()
              .includes(searchField.toLowerCase()) ||
              (electronic.smartphone as unknown as SmartphoneEntity).imei
                .toLowerCase()
                .includes(searchField.toLowerCase()))
          );
        }

        return false;
      });

      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedSinisters = filteredSinisters.slice(start, end);

      return paginatedSinisters;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  private async getBrokerDetailForDashboarDocuments(userId: string) {
    const user = await this.userService.getBrokerById(userId);

    if (!user.userBroker) return undefined

    const broAssets = user.assets as unknown as AssetEntity[];

    const assets = broAssets?.filter((asset) => asset.inspection);
    const assetsForSinisters: AssetEntity[] = broAssets
      ?.map((asset) => {
        if (asset.sinisters?.length) {
          let assets = [];

          for (let i = 0; i < asset.sinisters?.length; i++) {
            assets = [...assets, asset.sinisters[i]];
          }

          return assets;
        } else if (!asset.inspection) {
          return asset;
        }
      })
      .flat();

    const sinisterPromises = assetsForSinisters?.map(async (brokerAssets) => {
      const sinister = await this.sinisterForArrayPromisesBySinisterId(
        brokerAssets?.id,
      );

      return sinister;
    });

    const sinisters: SinisterEntity[] = (await Promise.all(sinisterPromises))?.flatMap(
      (sinister) => (!sinister ? [] : sinister),
    );

    return { assets, sinisters };
  }

  public async dashboardDocuments() {
 try {
   const users: UserEntity[] = await this.userService.getUsers();

   // Obtener la fecha actual
   const currentDate = new Date();
   const currentMonth = currentDate.getMonth(); // Mes actual (0-11)
   const currentWeek = Math.ceil(currentDate.getDate() / 7); // Semana actual

   // Inicializar el objeto para almacenar los resultados por propiedad (assets y sinisters)
   const assetSinisterData: DateData[] = [
     {
       label: 'Inspecciones',
       months: Array(12).fill(0),
       weeks: Array(12).fill(0),
     },
     {
       label: 'Siniestros',
       months: Array(12).fill(0),
       weeks: Array(12).fill(0),
     },
   ];

   // Recorrer los usuarios y contar documentos por propiedad en los últimos 12 meses y semanas
   for (const user of users) {
     const documents = await this.getBrokerDetailForDashboarDocuments(
       user.id,
     );

     documents?.assets.forEach((asset) => {
       const assetMonth = asset.created_at.getMonth();
       const assetWeek = Math.ceil(asset.created_at.getDate() / 7);

       if (assetMonth >= currentMonth - 11 && assetMonth <= currentMonth) {
         assetSinisterData[0].months[currentMonth - assetMonth] += 1; // Inspecciones
       }

       if (assetWeek >= currentWeek - 11 && assetWeek <= currentWeek) {
         assetSinisterData[0].weeks[currentWeek - assetWeek] += 1; // Inspecciones
       }
     });

     documents?.sinisters.forEach((sinister) => {
       const sinisterMonth = sinister.created_at.getMonth();
       const sinisterWeek = Math.ceil(sinister.created_at.getDate() / 7);

       if (
         sinisterMonth >= currentMonth - 11 &&
         sinisterMonth <= currentMonth
       ) {
         assetSinisterData[1].months[currentMonth - sinisterMonth] += 1; // Siniestros
       }

       if (sinisterWeek >= currentWeek - 11 && sinisterWeek <= currentWeek) {
         assetSinisterData[1].weeks[currentWeek - sinisterWeek] += 1; // Siniestros
       }
     });
   }

   // Devolver el resultado
   return assetSinisterData;
 } catch (error) {
   throw new ErrorManager.createSignaturError(error.message);
 }
  }
}
