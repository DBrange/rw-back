import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CarModel } from '../car-models/entities/carModel.entity';
import { VehicleGncModule } from '../vehicle-gnc/vehicle-gnc.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, CarModel]), VehicleGncModule],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService]
})
export class VehicleModule {}
