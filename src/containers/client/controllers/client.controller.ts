import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from '../client.service';
import { CreateClientDto } from '../dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('all')
  findAll() {
    return this.clientService.findAll();
  }
}
