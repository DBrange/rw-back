import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ThirdPartyVehicleDTO, UpdateThirdPartyVehicleDTO } from '../dto/third-party-vehicle.dto';
import { ThirdPartyVehicleService } from '../services/third-party-vehicle.service';

@Controller('third-party-vehicle')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ThirdPartyVehicleController {
  constructor(
    private readonly thirdPartyVehicleService: ThirdPartyVehicleService,
  ) {}

  @Post('')
  public async createThirdPartyVehicle(@Body() body: ThirdPartyVehicleDTO) {
    return await this.thirdPartyVehicleService.createThirdPartyVehicle(body);
  }

  @Get('')
  public async getThirdPartyVehicles() {
    return await this.thirdPartyVehicleService.getThirdPartyVehicles();
  }

  @Get(':thirdPartyVehicleId')
  public async getThirdPartyVehicleById(
    @Param('thirdPartyVehicleId') id: string,
  ) {
    return await this.thirdPartyVehicleService.getThirdPartyVehicleById(id);
  }

  @Put(':thirdPartyVehicleId')
  public async updateThirdPartyVehicle(
    @Param('thirdPartyVehicleId') id: string,
    @Body() body: UpdateThirdPartyVehicleDTO,
  ) {
    return await this.thirdPartyVehicleService.updateThirdPartyVehicle(
      id,
      body,
    );
  }

  @Delete(':thirdPartyVehicleId')
  public async deleteThirdPartyVehicle(
    @Param('thirdPartyVehicleId') id: string,
  ) {
    return await this.thirdPartyVehicleService.deleteThirdPartyVehicle(id);
  }
}
