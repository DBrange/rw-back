import { Module } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBrokerController } from './controllers/user-broker.controller';
import { UserBrokerService } from './services/user-broker.service';
import { UserBrokerEntity } from './entities/user-broker.entity';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBrokerEntity])],
  controllers: [UserBrokerController],
  exports: [UserBrokerService],
  providers: [UserBrokerService],
})
export class UserBrokerModule {}
