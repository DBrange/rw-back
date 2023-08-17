import { Body, Controller, Post } from '@nestjs/common';
import { VehicleGncService } from './vehicle-gnc.service';
import { VehicleGncDTO } from './dto/vehicleGnc.dto';

@Controller('vehicle-gnc')
export class VehicleGncController {
     constructor(
          private readonly vehicleGncService: VehicleGncService
        ) {}
      
        @Post('create')
        async createVehicleAndGnc(@Body() requestData: VehicleGncDTO) {
          const result = await this.vehicleGncService.createVehicleGnc(requestData.vehicleData, requestData.gncData);
          return result;
        }
}
