import { Body, Controller, Post } from '@nestjs/common';
import { InjuredInfoService } from './injured-info.service';
import { InjuredInfoDTO } from './dto/injuredInfo.dto';

@Controller('injured-info')
export class InjuredInfoController {
     constructor(
          private readonly injuredInfoService: InjuredInfoService
     ){}


     @Post('create')
     public async createInjuredInfo(@Body() body:InjuredInfoDTO){
          return await this.injuredInfoService.createInjuredInfo(body);
     }
};
