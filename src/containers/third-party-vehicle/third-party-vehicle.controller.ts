import { Body, Controller, Post } from '@nestjs/common';
import { ThirdPartyVehicleService } from './third-party-vehicle.service';
import { ThirdPartyVehicleDTO } from './dto/thirdPartyVehicle.dto';

@Controller('third-party-vehicle')
export class ThirdPartyVehicleController {
     constructor(
          private readonly thirdPartyVehicleService: ThirdPartyVehicleService
     ){}

     @Post('create')
     public async createThirdPartyVehicle(@Body() body: ThirdPartyVehicleDTO) {
          return await this.thirdPartyVehicleService.createThirdPartyVehicle(body);
     }
};
