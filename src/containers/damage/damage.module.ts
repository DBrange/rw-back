import { Module } from '@nestjs/common';
import { DamageService } from './services/damage.service';
import { DamageController } from './controllers/damage.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DamageEntity } from './entities/damage.entity';

@Module({
  providers: [DamageService],
  controllers: [DamageController],
  imports: [TypeOrmModule.forFeature([DamageEntity])],
  exports: [DamageService],
})
export class DamageModule {}
