import { Module } from '@nestjs/common';
import { TheftService } from './services/theft.service';
import { TheftController } from './controllers/theft.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TheftEntity } from './entities/theft.entity';

@Module({
  providers: [TheftService],
  controllers: [TheftController],
  imports: [TypeOrmModule.forFeature([TheftEntity])],
  exports: [TheftService],
})
export class TheftModule {}
