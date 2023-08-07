import { Body, Controller, Post } from '@nestjs/common';
import { ElectronicsModelsService } from './electronics-models.service';
import { EModelDTO } from './dto/Emodel.dto';

@Controller('e-models')
export class ElectronicsModelsController {
     constructor(
          private readonly eModelsService: ElectronicsModelsService
     ){}

     @Post('create')
     public async createEModel(@Body() body: EModelDTO) {
          return await this.eModelsService.createElectronicModels(body);
     }
};
