import { Body, Controller, Post } from '@nestjs/common';
import { CrashService } from './crash.service';
import { CrashDTO } from './dto/crash.dto';

@Controller('crash')
export class CrashController {
     constructor(
          private readonly crashService: CrashService
     ){}

     @Post('create')
     public async createCrash(@Body() body: CrashDTO){
          return await this.crashService.createCrash(body);
     }
};
