import { Body, Controller, Post } from '@nestjs/common';
import { TheftService } from './theft.service';
import { TheftDTO } from './dto/theft.dto';

@Controller('theft')
export class TheftController {
     constructor(
          private readonly theftService: TheftService
     ){}

     @Post('create')
     public async createTheft(@Body() body: TheftDTO){
          return await this.theftService.createTheft(body);
     }
};
