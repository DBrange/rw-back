import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheftTire } from './entities/theftTire.entity';
import { TheftTireController } from './theft-tire.controller';
import { TheftTireService } from './theft-tire.service';
import { Theft } from '../theft/entities/theft.entity';
import { TheftTheftTireModule } from '../theft-theft-tire/theft-theft-tire.module';

@Module({
  imports: [TypeOrmModule.forFeature([TheftTire, Theft]), TheftTheftTireModule],
  providers: [TheftTireService],
  controllers: [TheftTireController],
  exports: [TheftTireService],
})
export class TheftTireModule {}
