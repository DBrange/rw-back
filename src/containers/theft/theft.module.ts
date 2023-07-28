import { Module } from '@nestjs/common';
import { TheftController } from './theft.controller';
import { TheftService } from './theft.service';

@Module({
  controllers: [TheftController],
  providers: [TheftService]
})
export class TheftModule {}
