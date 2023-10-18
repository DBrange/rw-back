import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Smartphone } from './entities/smartphone.entity';
import { Repository } from 'typeorm';
import { SmartphoneDTO } from './dto/smartphone.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class SmartphonesService {
  constructor(
    @InjectRepository(Smartphone)
    private readonly smartphonesRepository: Repository<Smartphone>,
  ) {}

  public async getAllSmartphone(): Promise<Smartphone[]> {
    try {
      const results: Smartphone[] = await this.smartphonesRepository.find();
      if (results.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return results;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSmartphoneById(id: string): Promise<Smartphone> {
    try {
      const result = await this.smartphonesRepository
        .createQueryBuilder('electronics')
        .where({ id })
        //  .leftJoinAndSelect('electronics.asset', 'asset')
        .getOne();

      if (!result) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return result;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createSmartphone(body: SmartphoneDTO): Promise<Smartphone> {
    try {
      return await this.smartphonesRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
