import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ThirdPartyDriverDTO } from './dto/thirdPartyDriver.dto';
import { ThirdPartyDriverService } from './third-party-driver.service';
import { ThirdPartyDriver } from './entities/thirdPartyDriver.entity';

@Controller('third-party-driver')
export class ThirdPartyDriverController {
     constructor(
          private readonly thirdPartyDriverService: ThirdPartyDriverService
     ){}

     @Post('create')
     public async createThirdPartDriver(@Body() body: ThirdPartyDriverDTO){
          return await this.thirdPartyDriverService.createThirdPartyDriver(body);
     }

     @Get('all')
  public async getAllThirdPartyDrive(): Promise<ThirdPartyDriver[]> {
    return this.thirdPartyDriverService.getAllThirdPartyDrive();
  }

  @Get(':id')
  public async getThirdPartyDriveById(
    @Param('id') id: string,
  ): Promise<ThirdPartyDriver> {
    return this.thirdPartyDriverService.getThirdPartyDriveById(id);
  }
};
