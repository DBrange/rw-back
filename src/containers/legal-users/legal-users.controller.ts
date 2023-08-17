import { Body, Controller, Post } from '@nestjs/common';
import { LegalUsersService } from './legal-users.service';
import { LegalUsersDTO, } from './dto/legalUsers.dto';

@Controller('legal-users')
export class LegalUsersController {
     constructor(
          private readonly legalUsersService: LegalUsersService
     ){}

     @Post('create')
     public async createLegalUser(@Body() body: LegalUsersDTO){
          return await this.legalUsersService.createLegalUsers(body);
     }
};
