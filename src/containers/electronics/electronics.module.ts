import { Module } from '@nestjs/common';
import { ElectronicsController } from './electronics.controller';
import { ElectronicsService } from './electronics.service';

@Module({
  controllers: [ElectronicsController],
  providers: [ElectronicsService]
})
export class ElectronicsModule {}
