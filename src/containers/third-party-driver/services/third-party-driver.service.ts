import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ThirdPartyDriverDTO, UpdateThirdPartyDriverDTO } from '../dto/third-party-driver.dto';
import { ThirdPartyDriverEntity } from '../entities/third-party-driver.entity';

@Injectable()
export class ThirdPartyDriverService {
  constructor(
    @InjectRepository(ThirdPartyDriverEntity)
    private readonly thirdPartyDriverRepository: Repository<ThirdPartyDriverEntity>,
  ) {}

  public async createThirdPartyDriver(body: ThirdPartyDriverDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.thirdPartyDriverRepository.save(body);
      // return { message: 'The thirdPartyDriver has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getThirdPartyDrivers(): Promise<ThirdPartyDriverEntity[]> {
    try {
      const thirdPartyDrivers: ThirdPartyDriverEntity[] = await this.thirdPartyDriverRepository.find();

      return thirdPartyDrivers;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getThirdPartyDriverById(id: string) {
    try {
      const thirdPartyDriver = await this.thirdPartyDriverRepository.findOneBy({id})

      if (!thirdPartyDriver) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No thirdPartyDrivers found',
        });
      }
      return thirdPartyDriver;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateThirdPartyDriver(
    id: string,
    body: UpdateThirdPartyDriverDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedThirdPartyDriver = await this.thirdPartyDriverRepository.update(id, body);
      if (updatedThirdPartyDriver.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No thirdPartyDrivers were updated',
        });
      }

      return updatedThirdPartyDriver;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteThirdPartyDriver(id: string): Promise<DeleteResult> {
    try {
      const thirdPartyDriver: DeleteResult = await this.thirdPartyDriverRepository.delete(id);

      if (!thirdPartyDriver) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete thirdPartyDriver',
        });
      }

      return thirdPartyDriver;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
