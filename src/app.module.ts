import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DataSourceConfig } from './config/dataSource';
import { AssetModule } from './containers/asset/asset.module';
import { CarBrandsModule } from './containers/car-brands/car-brands.module';
import { CarModelsModule } from './containers/car-models/car-models.module';
import { CrashModule } from './containers/crash/crash.module';
import { DamageModule } from './containers/damage/damage.module';
import { ElectronicsModule } from './containers/electronics/electronics.module';
import { ElectronicsBrandsModule } from './containers/electronics-brands/electronics-brands.module';
import { ElectronicsModelsModule } from './containers/electronics-models/electronics-models.module';
import { FireModule } from './containers/fire/fire.module';
import { InjuredModule } from './containers/injured/injured.module';
import { InjuredInfoModule } from './containers/injured-info/injured-info.module';
import { LegalUsersModule } from './containers/legal-users/legal-users.module';
import { NewCarDataModule } from './containers/new-car-data/new-car-data.module';
import { SinisterModule } from './containers/sinister/sinister.module';
import { SinisterTypeModule } from './containers/sinister-type/sinister-type.module';
import { SmartphonesModule } from './containers/smartphones/smartphones.module';
import { TheftModule } from './containers/theft/theft.module';
import { ThirdPartyDriverModule } from './containers/third-party-driver/third-party-driver.module';
import { ThirdPartyVehicleModule } from './containers/third-party-vehicle/third-party-vehicle.module';
import { UsersModule } from './containers/users/users.module';
import { VehicleModule } from './containers/vehicle/vehicle.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : `.${process.env.NODE_ENV}.env`,
      isGlobal : true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    AssetModule,
    CarBrandsModule,
    CarModelsModule,
    CrashModule,
    DamageModule,
    ElectronicsModule,
    ElectronicsBrandsModule,
    ElectronicsModelsModule,
    FireModule,
    InjuredModule,
    InjuredInfoModule,
    LegalUsersModule,
    NewCarDataModule,
    SinisterModule,
    SinisterTypeModule,
    SmartphonesModule,
    TheftModule,
    ThirdPartyDriverModule,
    ThirdPartyVehicleModule,
    UsersModule,
    VehicleModule,
  ],
})
export class AppModule {}