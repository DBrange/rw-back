import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UpdateVehicleDTO, VehicleDTO } from '../dto/vehicle.dto';
import { VehicleEntity } from '../entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  public async createVehicle(body: VehicleDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.vehicleRepository.save(body);
      // return { message: 'The vehicle has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getVehicles(): Promise<VehicleEntity[]> {
    try {
      const vehicles: VehicleEntity[] = await this.vehicleRepository.find();

      return vehicles;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getVehicleById(id: string) {
    try {
      const vehicle = await this.vehicleRepository
        .createQueryBuilder('vehicles')
        .where({ id })
        .leftJoinAndSelect('vehicles.gncId', 'gnc')
        .leftJoinAndSelect('vehicles.asset', 'asset')
        .getOne();

      if (!vehicle) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No vehicles found',
        });
      }
      return vehicle;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateVehicle(
    id: string,
    body: UpdateVehicleDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedVehicle = await this.vehicleRepository.update(id, body);
      if (updatedVehicle.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No vehicles were updated',
        });
      }

      return updatedVehicle;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteVehicle(id: string): Promise<DeleteResult> {
    try {
      const vehicle: DeleteResult = await this.vehicleRepository.delete(id);

      if (!vehicle) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete vehicle',
        });
      }

      return vehicle;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async vehicleForPdf(vehicleId: string) {
    const vehicle = await this.vehicleRepository
      .createQueryBuilder('vehicles')
      .where({ id: vehicleId })
      .leftJoinAndSelect('vehicles.gncId', 'gnc')
      .getOne();

    if (!vehicle) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No vehicles found',
      });
    }

    return vehicle;
  }
}
