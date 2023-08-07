import { Body, Controller, Post } from '@nestjs/common';
import { ElectronicsService } from './electronics.service';
import { ElectronicsDTO } from './dto/electronics.dto';

@Controller('electronics')
export class ElectronicsController {
     constructor(
          private readonly electronicsService: ElectronicsService,
     ){}

     @Post('create')
     public async createElectronics(@Body() body: ElectronicsDTO){
          return await this.electronicsService.createElectronics(body);
     }
};
