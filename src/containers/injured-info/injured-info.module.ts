import { Module } from '@nestjs/common';
import { InjuredInfoController } from './injured-info.controller';
import { InjuredInfoService } from './injured-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuredInfo } from './entities/injuredInfo.entity';
import { Injured } from '../injured/entities/injured.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InjuredInfo, Injured])],
  controllers: [InjuredInfoController],
  providers: [InjuredInfoService]
})
export class InjuredInfoModule {}
