import { Body, Controller, Get, Post } from '@nestjs/common';
import { BrokerClientRelationService } from '../broker-client-relation.service';
import { CreateBrokerClientRelationDto } from '../dto/broker-client-relation.dto';

@Controller('broker-client-relation')
export class BrokerClientRelationController {
    constructor(private readonly brokerClientRelationService: BrokerClientRelationService) {}

  @Post()
  create(@Body() createRelationDto: CreateBrokerClientRelationDto) {
    return this.brokerClientRelationService.create(createRelationDto);
  }

  @Get()
  findAll() {
    return this.brokerClientRelationService.findAll();
  }
}
