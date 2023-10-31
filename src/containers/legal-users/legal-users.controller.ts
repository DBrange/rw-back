import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { LegalUsersService } from './legal-users.service';
import { LegalUsersDTO, } from './dto/legalUsers.dto';
import { LegalUsers } from './entities/legalUsers.entity';

@Controller('legal-users')
export class LegalUsersController {
  constructor(private readonly legalUsersService: LegalUsersService) {}

  @Get('all')
  public async getAllLegalUsers(): Promise<LegalUsers[]> {
    return this.legalUsersService.getAllLegalUsers();
  }

  @Get(':id')
  public async getLegalUserById(@Param('id') id: string): Promise<LegalUsers> {
    return this.legalUsersService.getLegalUserById(id);
  }

  @Post('create')
  public async createLegalUser(@Body() body: LegalUsersDTO) {
    return await this.legalUsersService.createLegalUsers(body);
  }

  @Post('add-legal-client/:client/:broker')
  public async addLegalClient(
    @Param('client') client: string,
    @Param('broker') broker: string,
  ) {
    return this.legalUsersService.addLegalClient(client, broker);
  }
};
