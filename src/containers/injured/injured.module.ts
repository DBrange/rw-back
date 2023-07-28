import { Module } from '@nestjs/common';
import { InjuredController } from './injured.controller';
import { InjuredService } from './injured.service';

@Module({
  controllers: [InjuredController],
  providers: [InjuredService]
})
export class InjuredModule {}
