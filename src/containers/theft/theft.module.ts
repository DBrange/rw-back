import { Module } from '@nestjs/common';
import { TheftController } from './theft.controller';
import { TheftService } from './theft.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theft } from './entities/theft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theft])],
  controllers: [TheftController],
  providers: [TheftService],
  exports: [TheftService],
})
export class TheftModule {}
