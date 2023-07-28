import { Module } from '@nestjs/common';
import { SmartphonesController } from './smartphones.controller';
import { SmartphonesService } from './smartphones.service';

@Module({
  controllers: [SmartphonesController],
  providers: [SmartphonesService]
})
export class SmartphonesModule {}
