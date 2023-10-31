import { Module } from '@nestjs/common';
import { LegalUsersController } from './legal-users.controller';
import { LegalUsersService } from './legal-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalUsers } from './entities/legalUsers.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LegalUsers, UserBrokerEntity])],
  controllers: [LegalUsersController],
  providers: [LegalUsersService, UserBrokerService]
})
export class LegalUsersModule {}
