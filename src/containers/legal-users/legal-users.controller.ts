import { Body, Controller, Post } from '@nestjs/common';
import { LegalUsersService } from './legal-users.service';
import { LegalUsersDto } from './dto/legalUsers.dto';

@Controller('legal-users')
export class LegalUsersController {
     constructor(
          private readonly legalUsersService: LegalUsersService
     ){}

     @Post('create')
     public async createLegalUser(@Body() body: LegalUsersDto){
          return await this.legalUsersService.createLegalUsers(body);
     }
};
