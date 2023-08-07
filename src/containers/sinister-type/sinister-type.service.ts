import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SinisterType } from './entities/sinisterType.entity';
import { Repository } from 'typeorm';
import { sinisterTypeDTO } from './dto/sinisterType.dto';

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
};
