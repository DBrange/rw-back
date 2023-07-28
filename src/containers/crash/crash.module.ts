import { Module } from '@nestjs/common';
import { CrashController } from './crash.controller';
import { CrashService } from './crash.service';

@Module({
  controllers: [CrashController],
  providers: [CrashService]
})
export class CrashModule {}
