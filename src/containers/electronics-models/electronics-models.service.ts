import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectronicsModels } from './entities/electronicsModels.entity';
import { Repository } from 'typeorm';
import { EModelDTO } from './dto/Emodel.dto';

@Injectable()
export class ElectronicsModelsService {
     constructor(
          @InjectRepository(ElectronicsModels)
          private readonly eModelsRepository: Repository<ElectronicsModels>
     ){}

     public async createElectronicModels( body: EModelDTO) : Promise<ElectronicsModels> {
          try {
          
               return await this.eModelsRepository.save(body);
               
          } catch (error) {
               throw new Error(error);
          }
     }
 
};
