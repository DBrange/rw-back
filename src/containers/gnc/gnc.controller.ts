import { Body, Controller, Post } from '@nestjs/common';
import { GncService } from './gnc.service';
import { GncDTO } from './dto/gnc.dto';

@Controller('gnc')
export class GncController {

     constructor(
          private readonly gncService: GncService
     ){}


     @Post('create')
     public async createGnc(@Body() body:GncDTO){
          return await this.gncService.createGnc(body);
     }

};
