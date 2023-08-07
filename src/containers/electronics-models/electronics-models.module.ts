import { Module } from '@nestjs/common';
import { ElectronicsModelsController } from './electronics-models.controller';
import { ElectronicsModelsService } from './electronics-models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectronicsModels } from './entities/electronicsModels.entity';
import { ElectronicsBrands } from '../electronics-brands/entities/electronicsBrands.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ElectronicsModels, ElectronicsBrands])],
  controllers: [ElectronicsModelsController],
  providers: [ElectronicsModelsService]
})
export class ElectronicsModelsModule {}
