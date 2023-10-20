import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { UserEntity } from '../users/entities/user.entity';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { Electronics } from '../electronics/entities/electronics.entity';
import { GncService } from '../gnc/gnc.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { UsersService } from '../users/users.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { SmartphonesService } from '../smartphones/smartphones.service';
import { Gnc } from '../gnc/entities/gnc.entity';
import { Smartphone } from '../smartphones/entities/smartphone.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssetEntity,
      Vehicle,
      Gnc,
      UserEntity,
      Smartphone,
      LegalUsers,
      Electronics,
      UserBrokerEntity
    ]),
  ],
  controllers: [AssetController],
  providers: [
    AssetService,
    GncService,
    VehicleService,
    ElectronicsService,
    SmartphonesService,
    UsersService,
    LegalUsersService,
    UserBrokerService
  ],
})
export class AssetModule {}
