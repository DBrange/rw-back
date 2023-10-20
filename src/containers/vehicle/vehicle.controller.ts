import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDTO } from './dto/vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Controller('vehicle')
export class VehicleController {
     constructor(private readonly vehicleService: VehicleService){}

     @Get('all')
     public async getAllVehicles(): Promise<Vehicle[]> {
       return this.vehicleService.getAllVehicles();
     }
   
     @Get(':id')
     public async getVehicleById(@Param('id') id: string): Promise<Vehicle[]> {
       return this.vehicleService.getVehicleById(id);
     }

     @Post('create')
     public async createVehicle(@Body() body: VehicleDTO){
          return await this.vehicleService.createVehicle(body)
     };

     
  @Get(':plateNumber')
  async getVehicleInfo(@Param('plateNumber') plateNumber: string): Promise<any> {
    try {
      const vehicleInfo = await this.vehicleService.fetchVehicleInfo(plateNumber);
      return  vehicleInfo ; 
    } catch (error) {
      throw new Error (error);
    }
  }

};
