import { Module } from '@nestjs/common';
import { SinisterService } from './services/sinister.service';
import { SinisterController } from './controllers/sinister.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AssetEntity } from '../asset/entities/asset.entity';
import { CrashEntity } from '../crash/entities/crash.entity';
import { ElectronicEntity } from '../electronic/entities/electronic.entity';
import { FireEntity } from '../fire/entities/fire.entity';
import { GncEntity } from '../gnc/entities/gnc.entity';
import { InjuredInfoEntity } from '../injured-info/entities/injured-info.entity';
import { InjuredEntity } from '../injured/entities/injured.entity';
import { LegalUserEntity } from '../legal-user/entities/legal-user.entity';
import { SinisterTypeEntity } from '../sinister-type/entities/sinister-type.entity';
import { SmartphoneEntity } from '../smartphone/entities/smartphone.entity';
import { TheftTireEntity } from '../theft-tire/entities/theft-tire.entity';
import { TheftEntity } from '../theft/entities/theft.entity';
import { ThirdPartyDriverEntity } from '../third-party-driver/entities/third-party-driver.entity';
import { ThirdPartyVehicleEntity } from '../third-party-vehicle/entities/third-party-vehicle.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { UserEntity } from '../user/entities/user.entity';
import { VehicleEntity } from '../vehicle/entities/vehicle.entity';
import { SinisterEntity } from './entities/sinister.entity';
import { AssetService } from '../asset/services/asset.service';
import { CrashService } from '../crash/services/crash.service';
import { ElectronicService } from '../electronic/services/electronic.service';
import { FireService } from '../fire/services/fire.service';
import { GncService } from '../gnc/services/gnc.service';
import { InjuredInfoService } from '../injured-info/services/injured-info.service';
import { InjuredService } from '../injured/services/injured.service';
import { LegalUserService } from '../legal-user/services/legal-user.service';
import { SinisterTypeService } from '../sinister-type/services/sinister-type.service';
import { SmartphoneService } from '../smartphone/services/smartphone.service';
import { TheftTireService } from '../theft-tire/services/theft-tire.service';
import { TheftService } from '../theft/services/theft.service';
import { ThirdPartyDriverService } from '../third-party-driver/services/third-party-driver.service';
import { ThirdPartyVehicleService } from '../third-party-vehicle/services/third-party-vehicle.service';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { VehicleService } from '../vehicle/services/vehicle.service';
import { UserService } from '../user/services/user.service';
import { DamageService } from '../damage/services/damage.service';
import { DamageEntity } from '../damage/entities/damage.entity';

@Module({
  providers: [
    SinisterService,
    AssetService,
    GncService,
    VehicleService,
    UserService,
    LegalUserService,
    ElectronicService,
    SmartphoneService,
    SinisterTypeService,
    TheftTireService,
    TheftService,
    FireService,
    InjuredService,
    InjuredInfoService,
    CrashService,
    ThirdPartyVehicleService,
    ThirdPartyDriverService,
    DamageService,
    UserBrokerService,
  ],
  controllers: [SinisterController],
  imports: [
    TypeOrmModule.forFeature([
      SinisterEntity,
      AssetEntity,
      VehicleEntity,
      GncEntity,
      UserEntity,
      LegalUserEntity,
      SmartphoneEntity,
      ElectronicEntity,
      SinisterTypeEntity,
      TheftEntity,
      TheftTireEntity,
      FireEntity,
      InjuredEntity,
      InjuredInfoEntity,
      CrashEntity,
      ThirdPartyVehicleEntity,
      ThirdPartyDriverEntity,
      DamageEntity,
      UserBrokerEntity,
    ]),
  ],
  exports: [SinisterService],
})
export class SinisterModule {}
