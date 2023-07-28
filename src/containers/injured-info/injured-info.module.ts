import { Module } from '@nestjs/common';
import { InjuredInfoController } from './injured-info.controller';
import { InjuredInfoService } from './injured-info.service';

@Module({
  controllers: [InjuredInfoController],
  providers: [InjuredInfoService]
})
export class InjuredInfoModule {}
