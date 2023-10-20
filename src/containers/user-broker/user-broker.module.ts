import { Module } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBrokerController } from './controllers/user-broker.controller';
import { UserBrokerService } from './services/user-broker.service';
import { UserBrokerEntity } from './entities/user-broker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserBrokerEntity]),
  ],
  providers: [UserBrokerService],
  controllers: [UserBrokerController],
  exports: [UserBrokerService]
})
export class UserBrokerModule {}
