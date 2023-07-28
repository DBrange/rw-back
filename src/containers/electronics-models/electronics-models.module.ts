import { Module } from '@nestjs/common';
import { ElectronicsModelsController } from './electronics-models.controller';
import { ElectronicsModelsService } from './electronics-models.service';

@Module({
  controllers: [ElectronicsModelsController],
  providers: [ElectronicsModelsService]
})
export class ElectronicsModelsModule {}
