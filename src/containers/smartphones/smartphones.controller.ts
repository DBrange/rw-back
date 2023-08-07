import { Body, Controller, Post } from '@nestjs/common';
import { SmartphonesService } from './smartphones.service';
import { SmartphoneDTO } from './dto/smartphone.dto';

@Controller('smartphones')
export class SmartphonesController {
     constructor(
          private readonly smartphonesService: SmartphonesService
     ){}
  
     @Post('create')
     public async createSmartphone(@Body() body: SmartphoneDTO){
 
          return await this.smartphonesService.createSmartphone(body);
 
     };
};