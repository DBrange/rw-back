import { Module } from '@nestjs/common';
import { VehicleGncController } from './vehicle-gnc.controller';
import { VehicleGncService } from './vehicle-gnc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Gnc } from '../gnc/entities/gnc.entity';
import { GncService } from '../gnc/gnc.service';
import { VehicleService } from '../vehicle/vehicle.service';


@Module({
  imports:[TypeOrmModule.forFeature([Vehicle, Gnc ])],
  controllers: [VehicleGncController],
  providers: [VehicleGncService, GncService, VehicleService]
})
export class VehicleGncModule {}
