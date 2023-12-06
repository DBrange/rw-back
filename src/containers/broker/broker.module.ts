import { Module } from '@nestjs/common';
import { BrokerService } from './services/broker.service';
import { BrokerController } from './controllers/broker.controller';
import { BrokerEntity } from './entities/broker.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [BrokerService],
  controllers: [BrokerController],
  imports: [TypeOrmModule.forFeature([BrokerEntity])],
})
export class BrokerModule {}
