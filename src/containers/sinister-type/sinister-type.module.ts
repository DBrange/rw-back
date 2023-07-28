import { Module } from '@nestjs/common';
import { SinisterTypeController } from './sinister-type.controller';
import { SinisterTypeService } from './sinister-type.service';

@Module({
  controllers: [SinisterTypeController],
  providers: [SinisterTypeService]
})
export class SinisterTypeModule {}
