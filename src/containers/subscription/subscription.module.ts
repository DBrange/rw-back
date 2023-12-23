import { Module } from '@nestjs/common';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';

@Module({
  providers: [SubscriptionService, UserService],
  controllers: [SubscriptionController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class SubscriptionModule {}
