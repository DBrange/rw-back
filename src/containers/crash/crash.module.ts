import { Module } from '@nestjs/common';
import { CrashController } from './crash.controller';
import { CrashService } from './crash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crash } from './entities/crash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crash])],
  controllers: [CrashController],
  providers: [CrashService],
  exports: [CrashService],
})
export class CrashModule {}
