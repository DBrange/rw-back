import { Body, Controller, Post } from '@nestjs/common';
import { FireService } from './fire.service';
import { FireDTO } from './dto/fire.dto';

@Controller('fire')
export class FireController {
     constructor(
          private readonly fireService: FireService
     ){}

     @Post('create')
     public async createFire(@Body() body: FireDTO){
          return await this.fireService.createFire(body);
     }
};
