import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientDTO, UpdateClientDTO } from '../dto/client.dto';
import { ClientService } from '../services/client.service';

@Controller('client')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('')
  public async createUser(@Body() body: ClientDTO) {
    return await this.clientService.createClient(body);
  }

  @Get('')
  public async getUsers() {
    return await this.clientService.getClients();
  }

  @Get(':clientId')
  public async getUserById(@Param('clientId') id: string) {
    return await this.clientService.getClientById(id);
  }

  @Put(':clientId')
  public async updateUser(
    @Param('clientId') id: string,
    @Body() body: UpdateClientDTO,
  ) {
    return await this.clientService.updateClient(id, body);
  }

  @Delete(':clientId')
  public async deleteUser(@Param('clientId') id: string) {
    return await this.clientService.deleteClient(id);
  }
}
