import { Module } from '@nestjs/common';
import { DamageController } from './damage.controller';
import { DamageService } from './damage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Damage } from './entities/damage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Damage])],
  controllers: [DamageController],
  providers: [DamageService]
})
export class DamageModule {}
