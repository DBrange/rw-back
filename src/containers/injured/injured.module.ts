import { Module } from '@nestjs/common';
import { InjuredController } from './injured.controller';
import { InjuredService } from './injured.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Injured } from './entities/injured.entity';
import { Sinister } from '../sinister/entities/sinister.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Injured, Sinister])],
  controllers: [InjuredController],
  providers: [InjuredService]
})
export class InjuredModule {}
