import { Module } from '@nestjs/common';
import { UserBrokerService } from './services/user-broker.service';
import { UserBrokerController } from './controllers/user-broker.controller';
import { UserBrokerEntity } from './entities/user-broker.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [UserBrokerService],
  controllers: [UserBrokerController],
  imports: [TypeOrmModule.forFeature([UserBrokerEntity])],
  exports: [UserBrokerService],
})
export class UserBrokerModule {}
