import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrokerService } from '../broker.service';
import { CreateBrokerDto } from '../dto/broker.dto';

@Controller('broker')
export class BrokerController {
    constructor(private readonly brokerService: BrokerService) {}

    @Post()
    create(@Body() createBrokerDto: CreateBrokerDto) {
      return this.brokerService.create(createBrokerDto);
    }
  
    @Get()
    findAll() {
      return this.brokerService.findAll();
    }
}
