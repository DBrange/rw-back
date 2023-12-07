import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AssetEntity } from '../entities/asset.entity';
import { AssetDTO, UpdateAssetDTO } from '../dto/asset.dto';
import { ElectronicDTO } from 'src/containers/electronic/dto/electronic.dto';
import { ElectronicService } from 'src/containers/electronic/services/electronic.service';
import { GncDTO } from 'src/containers/gnc/dto/gnc.dto';
import { GncService } from 'src/containers/gnc/services/gnc.service';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { SmartphoneDTO } from 'src/containers/smartphone/dto/smartphone.dto';
import { SmartphoneEntity } from 'src/containers/smartphone/entities/smartphone.entity';
import { SmartphoneService } from 'src/containers/smartphone/services/smartphone.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserService } from 'src/containers/user/services/user.service';
import { VehicleDTO } from 'src/containers/vehicle/dto/vehicle.dto';
import { VehicleService } from 'src/containers/vehicle/services/vehicle.service';
import { GncEntity } from 'src/containers/gnc/entities/gnc.entity';
import { VehicleEntity } from 'src/containers/vehicle/entities/vehicle.entity';

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
      let newSmartphone: SmartphoneEntity;
      if (electronicDTO.type === 'CELULAR') {
        const relatedSmartphone = {
          ...smartphoneDTO,
        };

        newSmartphone = await this.smartphoneService.createSmartphone(
          relatedSmartphone,
        );
      }

      const newElectronic = await this.electronicService.createElectronic({
        ...electronicDTO,
        smartphone: newSmartphone.id,
      });

      const asset = {
        ...assetDTO,
        electronic: newElectronic.id,
        user: brokerId,
        client: clientId,
        inspection: inspection === false ? false : true,
      };

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

  public async getInspectionsOfClients(userBrokerId: string) {
    try {
      const assets = (await this.userService.getUserById(userBrokerId))
        .assets as unknown as AssetEntity[];

      const inspections = assets.filter((asset) => asset.inspection);

      return inspections;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getAllClientsInBroker(userBrokerId: string) {
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

  // Elements in client

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
}
