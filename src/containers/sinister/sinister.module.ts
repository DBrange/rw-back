import { Module } from '@nestjs/common';
import { SinisterController } from './sinister.controller';
import { SinisterService } from './sinister.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sinister } from './entities/sinister.entity';
import { Asset } from '../asset/entities/asset.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sinister, Asset])],
  controllers: [SinisterController],
  providers: [SinisterService]
})
export class SinisterModule {}
