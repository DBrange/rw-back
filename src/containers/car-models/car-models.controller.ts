import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarModelsService } from './car-models.service';
import { CarModelDTO } from './dto/carModel.dto';

@Controller('car-models')
export class CarModelsController {
     constructor(
          private readonly carModelService: CarModelsService
     ){}

          @Post('create')
          public async createCarModel(@Body() body: CarModelDTO){
               return await this.carModelService.createCarModel(body);
          };

          @Get(':id')
          public async getModelById(@Param('id') id: string){
               return await this.carModelService.getModelById(id);
          };

};
