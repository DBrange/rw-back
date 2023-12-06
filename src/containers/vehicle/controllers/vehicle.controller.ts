import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateVehicleDTO, VehicleDTO } from '../dto/vehicle.dto';
import { VehicleService } from '../services/vehicle.service';

@Controller('vehicle')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('')
  public async createVehicle(@Body() body: VehicleDTO) {
    return await this.vehicleService.createVehicle(body);
  }

  @Get('')
  public async getVehicles() {
    return await this.vehicleService.getVehicles();
  }

  @Get(':vehicleId')
  public async getVehicleById(@Param('vehicleId') id: string) {
    return await this.vehicleService.getVehicleById(id);
  }

  @Put(':vehicleId')
  public async updateVehicle(
    @Param('vehicleId') id: string,
    @Body() body: UpdateVehicleDTO,
  ) {
    return await this.vehicleService.updateVehicle(id, body);
  }

  @Delete(':vehicleId')
  public async deleteVehicle(@Param('vehicleId') id: string) {
    return await this.vehicleService.deleteVehicle(id);
  }
}
