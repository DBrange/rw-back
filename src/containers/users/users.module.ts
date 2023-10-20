import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { LegalUsersService } from '../legal-users/legal-users.service';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserBrokerEntity, LegalUsers])],
  controllers: [UsersController],
  providers: [UsersService, UserBrokerService, LegalUsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
