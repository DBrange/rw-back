import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThirdPartyDriverDTO } from './dto/thirdPartyDriver.dto';
import { ThirdPartyDriver } from './entities/thirdPartyDriver.entity';

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
};