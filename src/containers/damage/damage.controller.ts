import { Body, Controller, Post } from '@nestjs/common';
import { DamageService } from './damage.service';
import { DamageDTO } from './dto/damage.dto';

@Controller('damage')
export class DamageController {
     constructor(
          private readonly damageService: DamageService
     ){}

     @Post('create')
     public async createDamage(@Body() body: DamageDTO){
          return await this.damageService.createDamage(body);
     }
};
