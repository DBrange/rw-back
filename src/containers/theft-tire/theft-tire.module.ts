import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheftTire } from './entities/theft-tire.entity';
import { TheftTireController } from './theft-tire.controller';
import { TheftTireService } from './theft-tire.service';
import { Theft } from '../theft/entities/theft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheftTire, Theft])],
  controllers: [TheftTireController],
  providers: [TheftTireService],
})
export class TheftTireModule {}
