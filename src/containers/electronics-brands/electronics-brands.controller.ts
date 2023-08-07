 import { Body, Controller, Post } from '@nestjs/common';
import { ElectronicsBrandsService } from './electronics-brands.service';
import { EBrandsDTO } from './dto/electronicBrands.dto';

@Controller('e-brands')
export class ElectronicsBrandsController {
     constructor(
          private readonly electronicasBrandService: ElectronicsBrandsService
     ){}

     @Post('create')
     public async createElectronicsBrand(@Body() body: EBrandsDTO){
          return await this.electronicasBrandService.createElectronicsBrands(body);
     }
};
