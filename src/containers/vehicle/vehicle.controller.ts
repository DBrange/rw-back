import { Body, Controller, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDTO } from './dto/vehicle.dto';

@Controller('vehicle')
export class VehicleController {
     constructor(private readonly vehicleService: VehicleService){}

     @Post('create')
     public async createVehicle(@Body() body: VehicleDTO){
          return await this.vehicleService.createVehicle(body)
     };
};
