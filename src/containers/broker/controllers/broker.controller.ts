import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrokerService } from '../broker.service';
import { BrokerDTO } from '../dto/broker.dto';

@Controller('broker')
export class BrokerController {
    constructor(private readonly brokerService: BrokerService) {}

    @Post('create')
    create(@Body() brokerDTO: BrokerDTO) {
      return this.brokerService.create(brokerDTO);
    }
  
    @Get('all')
    findAll() {
      return this.brokerService.findAll();
    }
}
