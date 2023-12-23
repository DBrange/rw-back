import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';
import { DataSourceConfig } from './config/dataSource';
import { AssetModule } from './containers/asset/asset.module';
import { BrokerModule } from './containers/broker/broker.module';
import { ClientModule } from './containers/client/client.module';
import { CrashModule } from './containers/crash/crash.module';
import { DamageModule } from './containers/damage/damage.module';
import { ElectronicModule } from './containers/electronic/electronic.module';
import { FireModule } from './containers/fire/fire.module';
import { GncModule } from './containers/gnc/gnc.module';
import { InjuredInfoModule } from './containers/injured-info/injured-info.module';
import { InjuredModule } from './containers/injured/injured.module';
import { LegalUserModule } from './containers/legal-user/legal-user.module';
import { NewCarDataModule } from './containers/new-car-data/new-car-data.module';
import { NotificationModule } from './containers/notification/notification.module';
import { PersonalUserModule } from './containers/personal-user/personal-user.module';
import { RegisterModule } from './containers/register/register.module';
import { SinisterTypeModule } from './containers/sinister-type/sinister-type.module';
import { SinisterModule } from './containers/sinister/sinister.module';
import { SmartphoneModule } from './containers/smartphone/smartphone.module';
import { SubscriptionModule } from './containers/subscription/subscription.module';
import { TheftTheftTireModule } from './containers/theft-theft-tire/theft-theft-tire.module';
import { TheftTireModule } from './containers/theft-tire/theft-tire.module';
import { TheftModule } from './containers/theft/theft.module';
import { ThirdPartyDriverModule } from './containers/third-party-driver/third-party-driver.module';
import { ThirdPartyVehicleModule } from './containers/third-party-vehicle/third-party-vehicle.module';
import { UserBrokerModule } from './containers/user-broker/user-broker.module';
import { UserInBrokerModule } from './containers/user-in-broker/user-in-broker.module';
import { UserModule } from './containers/user/user.module';
import { VehicleGncModule } from './containers/vehicle-gnc/vehicle-gnc.module';
import { VehicleModule } from './containers/vehicle/vehicle.module';
import { VerifyEmailDniModule } from './containers/verify-email-dni/verify-email-dni.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    AssetModule,
    BrokerModule,
    ClientModule,
    CrashModule,
    DamageModule,
    ElectronicModule,
    FireModule,
    GncModule,
    InjuredModule,
    InjuredInfoModule,
    LegalUserModule,
    NewCarDataModule,
    SinisterModule,
    SinisterTypeModule,
    SmartphoneModule,
    TheftModule,
    TheftTheftTireModule,
    TheftTireModule,
    ThirdPartyDriverModule,
    ThirdPartyVehicleModule,
    UserBrokerModule,
    UserModule,
    VehicleModule,
    VehicleGncModule,
    PersonalUserModule,
    RegisterModule,
    UserInBrokerModule,
    AuthModule,
    VerifyEmailDniModule,
    NotificationModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
