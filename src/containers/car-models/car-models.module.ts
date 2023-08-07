import { Module } from '@nestjs/common';
import { CarModelsController } from './car-models.controller';
import { CarModelsService } from './car-models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModel } from './entities/carModel.entity';
import { CarBrands } from '../car-brands/entities/carBrands.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CarModel, CarBrands])],
  controllers: [CarModelsController],
  providers: [CarModelsService]
})
export class CarModelsModule {}
