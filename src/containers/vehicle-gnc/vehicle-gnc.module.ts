import { Module } from '@nestjs/common';
import { VehicleGncService } from './services/vehicle-gnc.service';
import { VehicleGncController } from './controllers/vehicle-gnc.controller';

@Module({
  providers: [VehicleGncService],
  controllers: [VehicleGncController]
})
export class VehicleGncModule {}
