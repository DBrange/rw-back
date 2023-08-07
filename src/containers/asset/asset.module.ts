import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { User } from '../users/entities/user.entity';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { Electronics } from '../electronics/entities/electronics.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Asset, Vehicle, User, LegalUsers, Electronics])],
  controllers: [AssetController],
  providers: [AssetService]
})
export class AssetModule {}
