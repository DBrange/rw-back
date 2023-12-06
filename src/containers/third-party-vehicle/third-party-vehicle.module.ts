import { Module } from '@nestjs/common';
import { ThirdPartyVehicleService } from './services/third-party-vehicle.service';
import { ThirdPartyVehicleController } from './controllers/third-party-vehicle.controller';
import { ThirdPartyVehicleEntity } from './entities/third-party-vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [ThirdPartyVehicleService],
  controllers: [ThirdPartyVehicleController],
  imports: [TypeOrmModule.forFeature([ThirdPartyVehicleEntity])],
  exports: [ThirdPartyVehicleService],
})
export class ThirdPartyVehicleModule {}
