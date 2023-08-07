import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import {  Repository } from 'typeorm';
import { VehicleDTO } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
     constructor(
          @InjectRepository(Vehicle)
          private readonly vehicleRepository: Repository<Vehicle>
     ){}

     public async createVehicle(body: VehicleDTO) : Promise<Vehicle> {
          try {
              return  await this.vehicleRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };

};



