import { Body, Controller, Post } from '@nestjs/common';
import { ThirdPartyDriverDTO } from './dto/thirdPartyDriver.dto';
import { ThirdPartyDriverService } from './third-party-driver.service';

@Controller('third-party-driver')
export class ThirdPartyDriverController {
     constructor(
          private readonly thirdPartyDriverService: ThirdPartyDriverService
     ){}

     @Post('create')
     public async createThirdPartDriver(@Body() body: ThirdPartyDriverDTO){
          return await this.thirdPartyDriverService.createThirdPartyDriver(body);
     }
};
