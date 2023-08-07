import { Body, Controller, Post } from '@nestjs/common';
import { CarBrandsService } from './car-brands.service';
import { CarBrandDTO } from './dto/carBrand.dto';

@Controller('car-brands')
export class CarBrandsController {
     constructor(
          private readonly carBandsService: CarBrandsService
     ){}

     @Post('create')
     public async createCarBrand(@Body() body: CarBrandDTO){
          return await this.carBandsService.createCarBrand(body);
     };
};
