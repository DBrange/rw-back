import { Module } from '@nestjs/common';
import { ThirdPartyVehicleController } from './third-party-vehicle.controller';
import { ThirdPartyVehicleService } from './third-party-vehicle.service';

@Module({
  controllers: [ThirdPartyVehicleController],
  providers: [ThirdPartyVehicleService]
})
export class ThirdPartyVehicleModule {}
