import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
<<<<<<< HEAD
import { AssetEntity } from '../asset/entities/asset.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
=======
>>>>>>> 6e5a738fea9708e8e6308d9700ae7db071f9287f

@Global()
@Module({
<<<<<<< HEAD
  imports: [
    TypeOrmModule.forFeature([UserEntity, AssetEntity, UserBrokerEntity]),
  ],
=======
  imports: [TypeOrmModule.forFeature([UserEntity])],
>>>>>>> 6e5a738fea9708e8e6308d9700ae7db071f9287f
  controllers: [UsersController],
  providers: [UsersService, UserBrokerService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
