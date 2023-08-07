import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarBrands } from './entities/carBrands.entity';
import { Repository } from 'typeorm';
import { CarBrandDTO } from './dto/carBrand.dto';

@Injectable()
export class CarBrandsService {
     constructor(
          @InjectRepository(CarBrands)
          private readonly carBrandRepository: Repository<CarBrands>
     ){}

     public async createCarBrand(body: CarBrandDTO) : Promise<CarBrands> {
          try {
               return await this.carBrandRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
};
