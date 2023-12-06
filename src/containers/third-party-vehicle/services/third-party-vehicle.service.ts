import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ThirdPartyVehicleDTO, UpdateThirdPartyVehicleDTO } from '../dto/third-party-vehicle.dto';
import { ThirdPartyVehicleEntity } from '../entities/third-party-vehicle.entity';

@Injectable()
export class ThirdPartyVehicleService {
  constructor(
    @InjectRepository(ThirdPartyVehicleEntity)
    private readonly thirdPartyVehicleRepository: Repository<ThirdPartyVehicleEntity>,
  ) {}

  public async createThirdPartyVehicle(body: ThirdPartyVehicleDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.thirdPartyVehicleRepository.save(body);
      // return { message: 'The thirdPartyVehicle has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getThirdPartyVehicles(): Promise<ThirdPartyVehicleEntity[]> {
    try {
      const thirdPartyVehicles: ThirdPartyVehicleEntity[] = await this.thirdPartyVehicleRepository.find();

      return thirdPartyVehicles;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getThirdPartyVehicleById(id: string) {
    try {
      const thirdPartyVehicle = await this.thirdPartyVehicleRepository
        .createQueryBuilder('third_party_vehicles')
        .where({ id })
        .leftJoinAndSelect('thirdPartyVehicles.thirdPartyDriver', 'thirdPartyDriver')
        .leftJoinAndSelect('thirdPartyVehicles.sinister', 'sinister')
        .getOne();

      if (!thirdPartyVehicle) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No thirdPartyVehicles found',
        });
      }
      return thirdPartyVehicle;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateThirdPartyVehicle(
    id: string,
    body: UpdateThirdPartyVehicleDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedThirdPartyVehicle = await this.thirdPartyVehicleRepository.update(id, body);
      if (updatedThirdPartyVehicle.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No thirdPartyVehicles were updated',
        });
      }

      return updatedThirdPartyVehicle;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteThirdPartyVehicle(id: string): Promise<DeleteResult> {
    try {
      const thirdPartyVehicle: DeleteResult = await this.thirdPartyVehicleRepository.delete(id);

      if (!thirdPartyVehicle) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete thirdPartyVehicle',
        });
      }

      return thirdPartyVehicle;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
