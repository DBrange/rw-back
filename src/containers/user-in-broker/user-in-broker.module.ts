import { Module } from '@nestjs/common';
import { UserInBrokerService } from './services/user-in-broker.service';
import { UserInBrokerController } from './controllers/user-in-broker.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from '../user/entities/user.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserService } from '../user/services/user.service';
import { NotificationEntity } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/services/notification.service';

@Module({
  providers: [UserInBrokerService,UserService, UserBrokerService,NotificationService],
  controllers: [UserInBrokerController],
  imports: [TypeOrmModule.forFeature([UserEntity, UserBrokerEntity,NotificationEntity])],
})
export class UserInBrokerModule {}
