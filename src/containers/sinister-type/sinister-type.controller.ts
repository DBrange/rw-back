import { Body, Controller, Post } from '@nestjs/common';
import { SinisterTypeService } from './sinister-type.service';
import { sinisterTypeDTO } from './dto/sinisterType.dto';

@Controller('sinister-type')
export class SinisterTypeController {
     constructor(
          private readonly sinisterTypeService: SinisterTypeService
     ){}

     @Post('create')
     public async createSinisterType(@Body() body: sinisterTypeDTO){
          return await this.sinisterTypeService.createSinisterType(body);
     }
};
