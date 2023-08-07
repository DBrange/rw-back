import { Module } from '@nestjs/common';
import { ElectronicsController } from './electronics.controller';
import { ElectronicsService } from './electronics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Electronics } from './entities/electronics.entity';
import { ElectronicsModels } from '../electronics-models/entities/electronicsModels.entity';
import { Smartphone } from '../smartphones/entities/smartphone.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Electronics, ElectronicsModels, Smartphone])],
  controllers: [ElectronicsController],
  providers: [ElectronicsService]
})
export class ElectronicsModule {}
