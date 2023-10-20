import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AssetEntity } from '../asset/entities/asset.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AssetEntity, UserBrokerEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserBrokerService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
