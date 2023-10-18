import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SinisterType } from './entities/sinisterType.entity';
import { Repository } from 'typeorm';
import { sinisterTypeDTO } from './dto/sinisterType.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class SinisterTypeService {
   constructor(
     @InjectRepository(SinisterType)
     private readonly sinisterTypeRepository: Repository<SinisterType>
   ){}

   public async createSinisterType(body: sinisterTypeDTO): Promise<SinisterType>{
     try {
          return await this.sinisterTypeRepository.save(body);
     } catch (error) {
          throw new Error(error);
     }
   }

   public async getSinisterTypeById(id: string): Promise<SinisterType> {
    try {
      const result = await this.sinisterTypeRepository
        .createQueryBuilder('sinisterType')
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

  public async getAllSinisterType(): Promise<SinisterType[]> {
    try {
      const results: SinisterType[] = await this.sinisterTypeRepository.find();
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
};
