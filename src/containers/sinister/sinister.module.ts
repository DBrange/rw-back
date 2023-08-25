import { Module } from '@nestjs/common';
import { SinisterController } from './sinister.controller';
import { SinisterService } from './sinister.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sinister } from './entities/sinister.entity';
import { Asset } from '../asset/entities/asset.entity';
import { Electronics } from '../electronics/entities/electronics.entity';
import { Gnc } from '../gnc/entities/gnc.entity';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { Smartphone } from '../smartphones/entities/smartphone.entity';
import { User } from '../users/entities/user.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { SinisterType } from '../sinister-type/entities/sinisterType.entity';
import { Theft } from '../theft/entities/theft.entity';

import { TheftTire } from '../theft-tire/entities/theftTire.entity';
import { AssetService } from '../asset/asset.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { GncService } from '../gnc/gnc.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { SmartphonesService } from '../smartphones/smartphones.service';
import { UsersService } from '../users/users.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { SinisterTypeService } from '../sinister-type/sinister-type.service';
import { TheftTireService } from '../theft-tire/theft-tire.service';
import { TheftService } from '../theft/theft.service';
import { FireService } from '../fire/fire.service';
import { Fire } from '../fire/entities/fire.entity';
import { Injured } from '../injured/entities/injured.entity';
import { InjuredService } from '../injured/injured.service';
import { InjuredInfo } from '../injured-info/entities/injuredInfo.entity';
import { InjuredInfoService } from '../injured-info/injured-info.service';
import { Crash } from '../crash/entities/crash.entity';
import { CrashService } from '../crash/crash.service';
import { ThirdPartyDriverService } from '../third-party-driver/third-party-driver.service';
import { ThirdPartyVehicleService } from '../third-party-vehicle/third-party-vehicle.service';
import { ThirdPartyVehicle } from '../third-party-vehicle/entities/thirdPartyVehicle.entity';
import { ThirdPartyDriver } from '../third-party-driver/entities/thirdPartyDriver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sinister,
      Asset,
      Vehicle,
      Gnc,
      User,
      LegalUsers,
      Smartphone,
      Electronics,
      SinisterType,
      Theft,
      TheftTire,
      Fire,
      Injured,
      InjuredInfo,
      Crash,
      ThirdPartyVehicle,
      ThirdPartyDriver,
    ]),
  ],
  controllers: [SinisterController],
  providers: [
    SinisterService,
    AssetService,
    GncService,
    VehicleService,
    UsersService,
    LegalUsersService,
    ElectronicsService,
    SmartphonesService,
    SinisterTypeService,
    TheftTireService,
    TheftService,
    FireService,
    InjuredService,
    InjuredInfoService,
    CrashService,
    ThirdPartyVehicleService,
    ThirdPartyDriverService,
  ],
  exports: [SinisterService]
})
export class SinisterModule {}
