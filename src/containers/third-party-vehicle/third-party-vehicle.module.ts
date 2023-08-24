import { Module } from '@nestjs/common';
import { ThirdPartyVehicleController } from './third-party-vehicle.controller';
import { ThirdPartyVehicleService } from './third-party-vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdPartyVehicle } from './entities/thirdPartyVehicle.entity';
import { Sinister } from '../sinister/entities/sinister.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThirdPartyVehicle, Sinister])],
  controllers: [ThirdPartyVehicleController],
  providers: [ThirdPartyVehicleService],
  exports: [ThirdPartyVehicleService],
})
export class ThirdPartyVehicleModule {}
