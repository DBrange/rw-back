import { Module } from '@nestjs/common';
import { GncService } from './gnc.service';
import { GncController } from './gnc.controller';
import { Gnc } from './entities/gnc.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleGncModule } from '../vehicle-gnc/vehicle-gnc.module';
import { Asset } from '../asset/entities/asset.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Gnc, Vehicle, Asset]), VehicleGncModule],
  providers: [GncService],
  controllers: [GncController],
  exports: [GncService]
})
export class GncModule {}
