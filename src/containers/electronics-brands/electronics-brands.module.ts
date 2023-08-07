import { Module } from '@nestjs/common';
import { ElectronicsBrandsController } from './electronics-brands.controller';
import { ElectronicsBrandsService } from './electronics-brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectronicsBrands } from './entities/electronicsBrands.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ElectronicsBrands])],
  controllers: [ElectronicsBrandsController],
  providers: [ElectronicsBrandsService]
})
export class ElectronicsBrandsModule {}
