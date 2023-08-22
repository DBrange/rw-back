import { Module } from '@nestjs/common';
import { TheftTheftTireService } from './services/theft-theft-tire.service';
import { TheftTheftTireController } from './controllers/theft-theft-tire.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Theft } from '../theft/entities/theft.entity';
import { TheftTire } from '../theft-tire/entities/theftTire.entity';
import { TheftService } from '../theft/theft.service';
import { TheftTireService } from '../theft-tire/theft-tire.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theft, TheftTire])],
  controllers: [TheftTheftTireController],
  providers: [TheftTheftTireService, TheftService, TheftTireService],
})
export class TheftTheftTireModule {}
