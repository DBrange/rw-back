import { Module } from '@nestjs/common';
import { FireController } from './fire.controller';
import { FireService } from './fire.service';

@Module({
  controllers: [FireController],
  providers: [FireService]
})
export class FireModule {}
