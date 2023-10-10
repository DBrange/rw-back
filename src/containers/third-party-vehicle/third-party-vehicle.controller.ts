import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ThirdPartyVehicleService } from './third-party-vehicle.service';
import { ThirdPartyVehicleDTO } from './dto/thirdPartyVehicle.dto';
import { ThirdPartyVehicle } from './entities/thirdPartyVehicle.entity';

@Controller('third-party-vehicle')
export class ThirdPartyVehicleController {
     constructor(
          private readonly thirdPartyVehicleService: ThirdPartyVehicleService
     ){}

     @Get('all')
  public async getAllVehicles(): Promise<ThirdPartyVehicle[]> {
    return this.thirdPartyVehicleService.getAllVehicles();
  }

  @Get(':id')
  public async getVehicleById(@Param('id') id: string): Promise<ThirdPartyVehicle> {
    return this.thirdPartyVehicleService.getVehicleById(id);
  }

     @Post('create')
     public async createThirdPartyVehicle(@Body() body: ThirdPartyVehicleDTO) {
          return await this.thirdPartyVehicleService.createThirdPartyVehicle(body);
     }
};
