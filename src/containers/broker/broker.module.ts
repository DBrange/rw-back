import { Module } from '@nestjs/common';
import { BrokerController } from './controllers/broker.controller';
import { BrokerService } from './broker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broker } from './entities/broker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Broker])],
  controllers: [BrokerController],
  providers: [BrokerService]
})
export class BrokerModule {}
