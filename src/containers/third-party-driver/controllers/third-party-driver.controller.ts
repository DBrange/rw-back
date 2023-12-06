import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ThirdPartyDriverDTO, UpdateThirdPartyDriverDTO } from '../dto/third-party-driver.dto';
import { ThirdPartyDriverService } from '../services/third-party-driver.service';

@Controller('third-party-driver')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ThirdPartyDriverController {
  constructor(
    private readonly thirdPartyDriverService: ThirdPartyDriverService,
  ) {}

  @Post('')
  public async createThirdPartyDriver(@Body() body: ThirdPartyDriverDTO) {
    return await this.thirdPartyDriverService.createThirdPartyDriver(body);
  }

  @Get('')
  public async getThirdPartyDrivers() {
    return await this.thirdPartyDriverService.getThirdPartyDrivers();
  }

  @Get(':thirdPartyDriverId')
  public async getThirdPartyDriverById(
    @Param('thirdPartyDriverId') id: string,
  ) {
    return await this.thirdPartyDriverService.getThirdPartyDriverById(id);
  }

  @Put(':thirdPartyDriverId')
  public async updateThirdPartyDriver(
    @Param('thirdPartyDriverId') id: string,
    @Body() body: UpdateThirdPartyDriverDTO,
  ) {
    return await this.thirdPartyDriverService.updateThirdPartyDriver(id, body);
  }

  @Delete(':thirdPartyDriverId')
  public async deleteThirdPartyDriver(@Param('thirdPartyDriverId') id: string) {
    return await this.thirdPartyDriverService.deleteThirdPartyDriver(id);
  }
}
