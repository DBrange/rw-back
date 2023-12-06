import { Module } from '@nestjs/common';
import { UserInBrokerService } from './services/user-in-broker.service';
import { UserInBrokerController } from './controllers/user-in-broker.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from '../user/entities/user.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserService } from '../user/services/user.service';

@Module({
  providers: [UserInBrokerService,UserService, UserBrokerService],
  controllers: [UserInBrokerController],
  imports: [TypeOrmModule.forFeature([UserEntity, UserBrokerEntity])],
})
export class UserInBrokerModule {}
