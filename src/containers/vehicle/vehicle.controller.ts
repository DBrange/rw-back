import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDTO } from './dto/vehicle.dto';

@Controller('vehicle')
export class VehicleController {
     constructor(private readonly vehicleService: VehicleService){}

     @Post('create')
     public async createVehicle(@Body() body: VehicleDTO){
          return await this.vehicleService.createVehicle(body)
     };

     
  @Get(':plateNumber')
  async getVehicleInfo(@Param('plateNumber') plateNumber: string): Promise<any> {
    try {
      const vehicleInfo = await this.vehicleService.fetchVehicleInfo(plateNumber);
      return  vehicleInfo ; // You can customize the response structure as needed
    } catch (error) {
      throw new Error (error);
    }
  }

};
