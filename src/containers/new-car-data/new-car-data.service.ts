import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewCarData } from './entities/newCarData.entity';
import { Repository } from 'typeorm';
import { NewCarDataDTO } from './dto/newCarData.dto';

@Injectable()
export class NewCarDataService {
     constructor(
          @InjectRepository(NewCarData)
          private readonly newCarDataRepository: Repository<NewCarData>
     ){}

     public async createNewCarData(body: NewCarDataDTO): Promise<NewCarData>{
          try {
               return await this.newCarDataRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};
