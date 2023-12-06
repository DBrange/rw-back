import { Module } from '@nestjs/common';
import { AssetController } from './controllers/asset.controller';
import { AssetService } from './services/asset.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ElectronicEntity } from '../electronic/entities/electronic.entity';
import { ElectronicService } from '../electronic/services/electronic.service';
import { GncEntity } from '../gnc/entities/gnc.entity';
import { GncService } from '../gnc/services/gnc.service';
import { LegalUserEntity } from '../legal-user/entities/legal-user.entity';
import { LegalUserService } from '../legal-user/services/legal-user.service';
import { SmartphoneEntity } from '../smartphone/entities/smartphone.entity';
import { SmartphoneService } from '../smartphone/services/smartphone.service';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { VehicleService } from '../vehicle/services/vehicle.service';
import { AssetEntity } from './entities/asset.entity';

@Module({
  providers: [
    AssetService,
    VehicleService,
    GncService,
    SmartphoneService,
    ElectronicService,
    UserService,
    LegalUserService,
    UserBrokerService,
  ],
  controllers: [AssetController],
  imports: [
    TypeOrmModule.forFeature([
      AssetEntity,
      VehicleEntity,
      GncEntity,
      SmartphoneEntity,
      ElectronicEntity,
      UserEntity,
      LegalUserEntity,
      UserBrokerEntity,
    ]),
  ],
  exports: [AssetService],
})
export class AssetModule {}
