import { Body, Controller, Post } from '@nestjs/common';
import { SinisterService } from './sinister.service';
import { SinisterDTO } from './dto/sinister.dto';

@Controller('sinister')
export class SinisterController {
     constructor(
          private readonly sinisterService: SinisterService
     ){}

     @Post('create')
     public async createSinister(@Body() body: SinisterDTO){
          return await this.sinisterService.createSinister(body);
     }
};
