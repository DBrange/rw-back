import { Module } from '@nestjs/common';
import { ThirdPartyDriverController } from './third-party-driver.controller';
import { ThirdPartyDriverService } from './third-party-driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdPartyDriver } from './entities/thirdPartyDriver.entity';
import { ThirdPartyVehicle } from '../third-party-vehicle/entities/thirdPartyVehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThirdPartyDriver, ThirdPartyVehicle])],
  controllers: [ThirdPartyDriverController],
  providers: [ThirdPartyDriverService],
  exports: [ThirdPartyDriverService],
})
export class ThirdPartyDriverModule {}
