import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectronicsBrands } from './entities/electronicsBrands.entity';
import { Repository } from 'typeorm';
import { EBrandsDTO } from './dto/electronicBrands.dto';

@Injectable()
export class ElectronicsBrandsService {
     constructor(
          @InjectRepository(ElectronicsBrands)
          private readonly electronicsBrandsRepository: Repository<ElectronicsBrands>
     ){}

     public async createElectronicsBrands( body: EBrandsDTO) : Promise<ElectronicsBrands> {
          try {
               return await this.electronicsBrandsRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
};
