import { Module } from '@nestjs/common';
import { CarBrandsController } from './car-brands.controller';
import { CarBrandsService } from './car-brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrands } from './entities/carBrands.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CarBrands])],
  controllers: [CarBrandsController],
  providers: [CarBrandsService]
})
export class CarBrandsModule {}
