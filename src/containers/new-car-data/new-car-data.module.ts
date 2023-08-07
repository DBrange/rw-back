import { Module } from '@nestjs/common';
import { NewCarDataController } from './new-car-data.controller';
import { NewCarDataService } from './new-car-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewCarData } from './entities/newCarData.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NewCarData, Vehicle])],
  controllers: [NewCarDataController],
  providers: [NewCarDataService]
})
export class NewCarDataModule {}
