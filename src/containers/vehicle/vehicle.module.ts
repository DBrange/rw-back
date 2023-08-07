import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CarModel } from '../car-models/entities/carModel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, CarModel])],
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {}
