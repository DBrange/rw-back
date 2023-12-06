import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleEntity } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [VehicleService],
  controllers: [VehicleController],
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  exports: [VehicleService],
})
export class VehicleModule {}
