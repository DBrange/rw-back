import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Electronics } from './entities/electronics.entity';
import { Repository } from 'typeorm';
import { ElectronicsDTO } from './dto/electronics.dto';

@Injectable()
export class ElectronicsService {
     constructor(
          @InjectRepository(Electronics)
          private readonly electronicRepository: Repository<Electronics>
     ){}

     public async createElectronics(body: ElectronicsDTO): Promise<Electronics> {
          try {
               return await this.electronicRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};
