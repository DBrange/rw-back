import { Module } from '@nestjs/common';
import { BrokerController } from './controllers/broker.controller';
import { BrokerService } from './broker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broker } from './entities/broker.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Broker, UserEntity])],
  controllers: [BrokerController],
  providers: [BrokerService],
})
export class BrokerModule {}
