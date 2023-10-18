import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThirdPartyDriverDTO } from './dto/thirdPartyDriver.dto';
import { ThirdPartyDriver } from './entities/thirdPartyDriver.entity';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ThirdPartyDriverService {
    
     constructor(
          @InjectRepository(ThirdPartyDriver)
          private readonly thirdPartyDriverRepository: Repository<ThirdPartyDriver>
     ){}

     public async createThirdPartyDriver(body: ThirdPartyDriverDTO): Promise<ThirdPartyDriver> {
          try {
               return await this.thirdPartyDriverRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }

     public async getAllThirdPartyDrive(): Promise<ThirdPartyDriver[]> {
          try {
            const results: ThirdPartyDriver[] = await this.thirdPartyDriverRepository.find();
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
      
        public async getThirdPartyDriveById(id: string): Promise<ThirdPartyDriver> {
          try {
            const result = await this.thirdPartyDriverRepository
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
};