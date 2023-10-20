import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SinisterTypeService } from './sinister-type.service';
import { sinisterTypeDTO } from './dto/sinisterType.dto';
import { SinisterType } from './entities/sinisterType.entity';

@Controller('sinister-type')
export class SinisterTypeController {
     constructor(
          private readonly sinisterTypeService: SinisterTypeService
     ){}

     @Post('create')
     public async createSinisterType(@Body() body: sinisterTypeDTO){
          return await this.sinisterTypeService.createSinisterType(body);
     }

     @Get(':id')
     public async getSinisterTypeById(
       @Param('id') id: string,
     ): Promise<SinisterType> {
       return this.sinisterTypeService.getSinisterTypeById(id);
     }

     @Get('all')
     public async getAllSinisterType(): Promise<SinisterType[]> {
       return this.sinisterTypeService.getAllSinisterType();
     }
};
