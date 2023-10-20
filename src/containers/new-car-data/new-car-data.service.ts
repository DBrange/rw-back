import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCarData } from './entities/newCarData.entity';
import { Repository } from 'typeorm';
import { NewCarDataDTO } from './dto/newCarData.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class NewCarDataService {
  constructor(
    @InjectRepository(NewCarData)
    private readonly newCarDataRepository: Repository<NewCarData>,
  ) {}

  public async getAllNewCardData(): Promise<NewCarData[]> {
    try {
      const results: NewCarData[] = await this.newCarDataRepository.find();
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

  public async getNewCardDataById(id: string): Promise<NewCarData> {
    try {
      const result = await this.newCarDataRepository
        .createQueryBuilder('new_car_data')
        .where({ id })
        //  .leftJoinAndSelect('asset.asset', 'users')
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

  public async createNewCarData(body: NewCarDataDTO): Promise<NewCarData> {
    try {
      return await this.newCarDataRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
