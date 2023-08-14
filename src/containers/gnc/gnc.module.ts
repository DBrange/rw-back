import { Module } from '@nestjs/common';
import { GncService } from './gnc.service';
import { GncController } from './gnc.controller';
import { Gnc } from './entities/gnc.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Gnc, Vehicle])],
  providers: [GncService],
  controllers: [GncController]
})
export class GncModule {}
