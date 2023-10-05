import { Module } from '@nestjs/common';
import { BrokerClientRelationController } from './controllers/broker-client-relation.controller';
import { BrokerClientRelationService } from './broker-client-relation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerClientRelation } from './entities/broker-client-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrokerClientRelation])],
  controllers: [BrokerClientRelationController],
  providers: [BrokerClientRelationService]
})
export class BrokerClientRelationsModule {}
