import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from '../client.service';
import { ClientDTO } from '../dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  create(@Body() clientDTO: ClientDTO) {
    return this.clientService.create(clientDTO);
  }

  @Get('all')
  findAll() {
    return this.clientService.findAll();
  }
}
