import { Body, Controller, Post } from '@nestjs/common';
import { NewCarDataService } from './new-car-data.service';
import { NewCarDataDTO } from './dto/newCarData.dto';

@Controller('new-car-data')
export class NewCarDataController {
     constructor(
          private readonly newCarDataService: NewCarDataService
     ){}

     @Post('create')
     public async createNewCarData(@Body() body: NewCarDataDTO){
          return await this.newCarDataService.createNewCarData(body);
     }
};
