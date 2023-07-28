import { Module } from '@nestjs/common';
import { SinisterController } from './sinister.controller';
import { SinisterService } from './sinister.service';

@Module({
  controllers: [SinisterController],
  providers: [SinisterService]
})
export class SinisterModule {}
