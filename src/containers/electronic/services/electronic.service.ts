import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ElectronicEntity } from '../entities/electronic.entity';
import { ElectronicDTO, UpdateElectronicDTO } from '../dto/electronic.dto';

@Injectable()
export class ElectronicService {
  constructor(
    @InjectRepository(ElectronicEntity)
    private readonly electronicRepository: Repository<ElectronicEntity>,
  ) {}

  public async createElectronic(body: ElectronicDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.electronicRepository.save(body);
      // return { message: 'The electronic has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getElectronics(): Promise<ElectronicEntity[]> {
    try {
      const electronics: ElectronicEntity[] = await this.electronicRepository.find();

      return electronics;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getElectronicById(id: string) {
    try {
      const electronic = await this.electronicRepository
        .createQueryBuilder('electronics')
        .where({ id })
        .leftJoinAndSelect('electronics.asset', 'asset')
        .leftJoinAndSelect('electronics.smartphone', 'smartphone')
        .getOne();

      if (!electronic) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No electronics found',
        });
      }
      return electronic;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateElectronic(
    id: string,
    body: UpdateElectronicDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedElectronic = await this.electronicRepository.update(id, body);
      if (updatedElectronic.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No electronics were updated',
        });
      }

      return updatedElectronic;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteElectronic(id: string): Promise<DeleteResult> {
    try {
      const electronic: DeleteResult = await this.electronicRepository.delete(id);

      if (!electronic) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete electronic',
        });
      }

      return electronic;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
