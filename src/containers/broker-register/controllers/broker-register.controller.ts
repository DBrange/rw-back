import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrokerRegisterService } from '../broker-register.service';
import { CreateBrokerRegisterDto } from '../dto/broker-register.dto';

@Controller('broker-register')
export class BrokerRegisterController {
    constructor(private readonly brokerRegisterService: BrokerRegisterService) {}

    @Post()
    create(@Body() createBrokerRegisterDto: CreateBrokerRegisterDto) {
      return this.brokerRegisterService.create(createBrokerRegisterDto);
    }
  
    @Get()
    findAll() {
      return this.brokerRegisterService.findAll();
    }
}

