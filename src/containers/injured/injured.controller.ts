import { Body, Controller, Post } from '@nestjs/common';
import { InjuredService } from './injured.service';
import { InjuredDTO } from './dto/injured.dto';

@Controller('injured')
export class InjuredController {
     constructor(
          private readonly injuredService: InjuredService
     ){}

     @Post('create')
     public async createInjured(@Body() body: InjuredDTO){
          try {
               return await this.injuredService.createInjured(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};
