import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { User } from '../users/entities/user.entity';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Asset,
      Vehicle,
      Gnc,
      User,
      Smartphone,
      LegalUsers,
      Electronics,
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
    
  ],
})
export class AssetModule {}
