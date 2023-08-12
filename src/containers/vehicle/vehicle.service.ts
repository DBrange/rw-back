import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import {  Repository } from 'typeorm';
import { VehicleDTO } from './dto/vehicle.dto';
import axios from 'axios';

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

     public async fetchVehicleInfo(plateNumber: string): Promise<any> {
          const username = 'martin2';
          const url = `https://www.regcheck.org.uk/api/reg.asmx/CheckArgentina?RegistrationNumber=${plateNumber}&username=${username}`; 
          
          try {
               const response = await axios.get(url);
               const xmlData = response.data;
               // eslint-disable-next-line @typescript-eslint/no-var-requires
               const xmlToJson = require('xml-js')
               const jsonData = xmlToJson.xml2json(xmlData, {compact: true, spaces: 4} );
               const json = JSON.parse(jsonData);

               if (json.Vehicle && json.Vehicle.vehicleData) {
                    const vehicleData = json.Vehicle.vehicleData;
                    return {
                      description: vehicleData.Description._text,
                      carMake: vehicleData.CarMake.CurrentTextValue._text,
                      carModel: vehicleData.CarModel._text,
                    }
               }
          } catch (error) {
               throw new Error(error);
          }
     }
};



