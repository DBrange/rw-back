import { Injectable } from '@nestjs/common';
import { VehicleService } from '../vehicle/vehicle.service';
import { GncService } from '../gnc/gnc.service';
import { VehicleDTO } from '../vehicle/dto/vehicle.dto';
import { GncDTO } from '../gnc/dto/gnc.dto';

@Injectable()
export class VehicleGncService {
     constructor(
          private readonly gncService: GncService,
          private readonly vehicleService: VehicleService,
     ){}


     public async createVehicleGnc(vehicleData: VehicleDTO, gncData: GncDTO){
          try {
               
               const newVehicle = await this.vehicleService.createVehicle(vehicleData);
               
               const vehicleGnc = {
                    ...gncData,
                    vehicle: newVehicle.id
               }

               const gnc = await this.gncService.createGnc(vehicleGnc);

               return { newVehicle, gnc}
          } catch (error) {
               throw new Error(error);
          }
     };

};
