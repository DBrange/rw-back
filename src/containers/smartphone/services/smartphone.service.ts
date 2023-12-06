import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { SmartphoneDTO, UpdateSmartphoneDTO } from '../dto/smartphone.dto';
import { SmartphoneEntity } from '../entities/smartphone.entity';

@Injectable()
export class SmartphoneService {
  constructor(
    @InjectRepository(SmartphoneEntity)
    private readonly smartphoneRepository: Repository<SmartphoneEntity>,
  ) {}

  public async createSmartphone(body: SmartphoneDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.smartphoneRepository.save(body);
      // return { message: 'The smartphone has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSmartphones(): Promise<SmartphoneEntity[]> {
    try {
      const smartphones: SmartphoneEntity[] = await this.smartphoneRepository.find();

      return smartphones;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSmartphoneById(id: string) {
    try {
      const smartphone = await this.smartphoneRepository
        .createQueryBuilder('smartphone')
        .where({ id })
        .leftJoinAndSelect('smartphone.electronic', 'electronic')
        .getOne();

      if (!smartphone) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No smartphones found',
        });
      }
      return smartphone;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateSmartphone(
    id: string,
    body: UpdateSmartphoneDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedSmartphone = await this.smartphoneRepository.update(id, body);
      if (updatedSmartphone.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No smartphones were smartphone',
        });
      }

      return updatedSmartphone;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteSmartphone(id: string): Promise<DeleteResult> {
    try {
      const smartphone: DeleteResult = await this.smartphoneRepository.delete(id);

      if (!smartphone) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete smartphone',
        });
      }

      return smartphone;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
