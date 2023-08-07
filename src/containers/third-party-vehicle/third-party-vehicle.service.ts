import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThirdPartyVehicle } from './entities/thirdPartyVehicle.entity';
import { Repository } from 'typeorm';
import { ThirdPartyVehicleDTO } from './dto/thirdPartyVehicle.dto';

@Injectable()
export class ThirdPartyVehicleService {
     constructor(
          @InjectRepository(ThirdPartyVehicle)
          private readonly thirdPartyVehicleRepository: Repository<ThirdPartyVehicle>
     ){}

     public async createThirdPartyVehicle(body: ThirdPartyVehicleDTO): Promise<ThirdPartyVehicle>{
          try {
               return await this.thirdPartyVehicleRepository.save(body);
          } catch (error) {
               throw new Error(error)
          }
     }
};
