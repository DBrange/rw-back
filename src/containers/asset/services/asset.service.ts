import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ElectronicDTO } from 'src/containers/electronic/dto/electronic.dto';
import { ElectronicEntity } from 'src/containers/electronic/entities/electronic.entity';
import { ElectronicService } from 'src/containers/electronic/services/electronic.service';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { GncEntity } from 'src/containers/gnc/entities/gnc.entity';
import { GncService } from 'src/containers/gnc/services/gnc.service';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { NotificationDTO } from 'src/containers/notification/dto/notification.dto';
import { NotificationEntity } from 'src/containers/notification/entities/notification.entity';
import { NotificationService } from 'src/containers/notification/services/notification.service';
import { SmartphoneDTO } from 'src/containers/smartphone/dto/smartphone.dto';
import { SmartphoneEntity } from 'src/containers/smartphone/entities/smartphone.entity';
import { SmartphoneService } from 'src/containers/smartphone/services/smartphone.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { VehicleEntity } from 'src/containers/vehicle/entities/vehicle.entity';
import { VehicleService } from 'src/containers/vehicle/services/vehicle.service';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AssetDTO, UpdateAssetDTO } from '../dto/asset.dto';
import { AssetEntity } from '../entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
    private readonly vehicleService: VehicleService,
    private readonly gncService: GncService,
    private readonly smartphoneService: SmartphoneService,
    private readonly electronicService: ElectronicService,
    private readonly userService: UserService,
    private readonly legalUserService: LegalUserService,
    private readonly userBrokerService: UserBrokerService,
    private readonly notificationService: NotificationService,
  ) {}

  public async createAsset(body: AssetDTO) {
    try {
      return await this.assetRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAssets(): Promise<AssetEntity[]> {
    try {
      const assets: AssetEntity[] = await this.assetRepository.find();

      return assets;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAssetById(id: string) {
    try {
      const asset = await this.assetRepository
        .createQueryBuilder('assets')
        .where({ id })
        // .leftJoinAndSelect('assets.user', 'user')
        .leftJoinAndSelect('assets.client', 'client')
        .leftJoinAndSelect('client.personalUser', 'personalUser')
        .leftJoinAndSelect('client.legalUser', 'legalUser')
        .leftJoinAndSelect('assets.vehicle', 'vehicle')
        .leftJoinAndSelect('vehicle.gncId', 'gncId')
        .leftJoinAndSelect('assets.electronic', 'electronic')
        .leftJoinAndSelect('electronic.smartphone', 'smartphone')
        .leftJoinAndSelect('assets.sinisters', 'sinisters')
        .getOne();

      if (!asset) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No assets found',
        });
      }
      return asset;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateAsset(
    id: string,
    body: UpdateAssetDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedAsset = await this.assetRepository.update(id, body);
      if (updatedAsset.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No assets were updated',
        });
      }

      return updatedAsset;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteAsset(id: string): Promise<DeleteResult> {
    try {
      const asset: DeleteResult = await this.assetRepository.delete(id);

      if (!asset) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete asset',
        });
      }

      return asset;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  private async vehicleInspectionNotification(
    newVehicle: VehicleEntity,
    clientId: string,
    brokerId: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newVehicle.plate}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newVehicle.plate}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);
  }

  private async electronicInspectionNotification(
    newElectronic: ElectronicEntity,
    clientId: string,
    brokerId: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newElectronic.brand} ${newElectronic.model}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha realizado una nueva inspeccion - ${newElectronic.brand} ${newElectronic.model}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);
  }

  public async createVehicleInAsset(
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    assetDTO: AssetDTO,
    brokerId: string,
    clientId: string,
    inspection?: boolean,
  ) {
    try {
      let newGnc: GncEntity;
      if (vehicleDTO.gnc) {
        const vehicleGnc: GncDTO = {
          ...gncDTO,
        };
        newGnc = await this.gncService.createGnc(vehicleGnc);
      }

      const newVehicle: VehicleEntity = await this.vehicleService.createVehicle(
        {
          ...vehicleDTO,
          gncId: newGnc?.id,
        },
      );

      const asset: AssetDTO = {
        ...assetDTO,
        vehicle: newVehicle?.id,
        user: brokerId,
        client: clientId,
        inspection: inspection === false ? false : true,
      };

      if (inspection !== false) {
        await this.vehicleInspectionNotification(
          newVehicle,
          clientId,
          brokerId,
        );
      }

      return await this.createAsset(asset);
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async createElectronicInAsset(
    electronicDTO: ElectronicDTO,
    smartphoneDTO: SmartphoneDTO,
    assetDTO: AssetDTO,
    brokerId: string,
    clientId: string,
    inspection?: boolean,
  ) {
    try {
      let newSmartphone: SmartphoneEntity | null;
      if (electronicDTO.type === 'CELULAR') {
        const relatedSmartphone: SmartphoneDTO = {
          ...smartphoneDTO,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newElectronic = await this.electronicService.createElectronic({
        ...electronicDTO,
        smartphone: newSmartphone ? newSmartphone.id : null,
      });

      const asset = {
        ...assetDTO,
        electronic: newElectronic.id,
        user: brokerId,
        client: clientId,
        inspection: inspection === false ? false : true,
      };

      if (inspection !== false) {
        await this.electronicInspectionNotification(
          newElectronic,
          clientId,
          brokerId,
        );
      }

      return await this.createAsset(asset);
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async createInspection(
    brokerId: string,
    clientId: string,
    vehicleDTO: VehicleDTO,
    gncDTO: GncDTO,
    electronicDTO: ElectronicDTO,
    smartphoneDTO: SmartphoneDTO,
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
        await this.createVehicleInAsset(
          vehicleDTO,
          gncDTO,
          assetDTO,
          brokerId,
          clientId,
        );
      } else {
        await this.createElectronicInAsset(
          electronicDTO,
          smartphoneDTO,
          assetDTO,
          brokerId,
          clientId,
        );
      }

      return { message: 'La inspeccion a sido realizada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInspectionsOfClients(
    brokerId: string,
    searchField: string,
    typeToFilter: string,
    page: number,
    limit: number,
  ) {
    try {
      const assets = (await this.userService.getInspectionsOfClients(
        brokerId,
      )) as unknown as AssetEntity[];

      // Aplicar el filtro según el tipo
      const filteredAssets = assets.filter((asset) => {
        if (typeToFilter === 'vehicle') {
          return asset.vehicle;
        } else if (typeToFilter === 'electronic') {
          return asset.electronic;
        }
        return false;
      });

      // Aplicar el filtro según el campo de búsqueda
      const regex = new RegExp(`^${searchField}`, 'i');
      const filteredAndSearchedAssets = filteredAssets.filter((asset) => {
        if (typeToFilter === 'vehicle') {
          const vehicle = asset.vehicle as unknown as VehicleEntity;
          return regex.test(vehicle?.plate as string);
        } else if (typeToFilter === 'electronic') {
          const electronic = asset.electronic as unknown as ElectronicEntity;
          return (
            regex.test(electronic?.model) ||
            regex.test(
              (electronic?.smartphone as unknown as SmartphoneEntity)?.imei,
            )
          );
        }
        return false;
      });

      // Aplicar paginación
      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedInspections = filteredAndSearchedAssets.slice(start, end);

      return paginatedInspections;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getAllClientsInBroker(
    userBrokerId: string,
    searchField: string,
    typeToFilter: string,
    page: number,
    limit: number,
  ) {
    try {
      const { clients } = await this.userBrokerService.getUserBrokerById(
        userBrokerId,
      );

      const regex = new RegExp(`^${searchField}`, 'i');
      const filteredClients = (clients as unknown as UserEntity[]).filter(
        (client) => {
          console.log(client);
          if (typeToFilter === 'user' && client.personalUser?.dni) {
            return client.personalUser?.dni
              .toLowerCase()
              .includes(searchField.toLowerCase());
          } else if (typeToFilter === 'legalUser' && client.legalUser?.cuit) {
            return client.legalUser.cuit
              .toLowerCase()
              .includes(searchField.toLowerCase());
          }

          return false;
        },
      );

      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const paginatedClients = filteredClients.slice(start, end);

      return paginatedClients;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getAllClientsInBrokerr(userBrokerId: string) {
    try {
      const clients = (
        await this.userBrokerService.getUserBrokerById(userBrokerId)
      ).clients;

      // const inspections = assets.filter((asset) => asset.inspection);

      return clients;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async findAssetsByBrokerClient(brokerId: string, clientId: string) {
    const assets = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .where({ user: brokerId })
      .andWhere({ client: clientId })
      .getMany();

    return assets;
  }

  public async findAssetsByBroker(brokerId: string) {
    const assets = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .where({ user: brokerId })
      .getMany();

    return assets;
  }

  // Elements in client

  private async getAssetByIdForElements(assetId: string) {
    const asset = await this.assetRepository
      .createQueryBuilder('assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .where({ user: assetId })
      .getMany();
  }

  public async getAllElementsFromClient(clientId: string) {
    try {
      const clientAssets = (await this.userService.getUserById(clientId))
        .brokerAssets as unknown as AssetEntity[];

      const promiseElement = clientAssets.map(async (el) => {
        const vehicle = await (await this.getAssetById(el.id)).vehicle;
        const electronic = await (await this.getAssetById(el.id)).electronic;
        return [vehicle, electronic];
      });

      const elements = (await Promise.all(promiseElement))
        .flat()
        .flatMap((el) => (el === null ? [] : el));

      return elements;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async allRead(userId: string) {
    const user = await this.userService.getUserById(userId);

    const notifications =
      user.receivedNotifications as unknown as NotificationEntity[];

    const promiseNotificationsRead = notifications.map(async (el) => {
      el.isRead = true;
      const notification = await this.notificationService.updateNotification(
        el.id,
        el,
      );
      return notification;
    });

    await Promise.all(promiseNotificationsRead);

    const userr = (await this.userService.getUserById(userId))
      .receivedNotifications;

    return userr;
  }
}
