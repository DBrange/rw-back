import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/carModel.entity';
import { Repository } from 'typeorm';
import { CarModelDTO } from './dto/carModel.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class CarModelsService {
     constructor(
          @InjectRepository(CarModel)
          private readonly carModelRepository: Repository<CarModel>,
     ){}
     
          public async createCarModel(body: CarModelDTO) : Promise<CarModel>{
               try {
                    return await this.carModelRepository.save(body);
               } catch (error) {
                    throw new Error(error);
               }
          };

          public async getModelById(id: string): Promise<CarModel> {
               try {
                    const carModel= await this.carModelRepository
                     .createQueryBuilder('carModel')
                     .where({ id })
                     .leftJoinAndSelect('carModel.carBrands', 'carBrands')
                    //  .leftJoinAndSelect('carBrands.', 'carBrands')
                     .getOne();
      
                     if(!carModel) {
                          throw new ErrorManager({
                               type: 'BAD_REQUEST',
                               message: 'No Model found',
                          })
                     }
                     return carModel;
                } catch (error) {
                     throw new ErrorManager.createSignaturError(error.message);
      
                }
          }
};
