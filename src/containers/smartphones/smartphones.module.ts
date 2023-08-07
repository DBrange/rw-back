import { Module } from '@nestjs/common';
import { SmartphonesController } from './smartphones.controller';
import { SmartphonesService } from './smartphones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smartphone } from './entities/smartphone.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Smartphone])],
  controllers: [SmartphonesController],
  providers: [SmartphonesService]
})
export class SmartphonesModule {}
