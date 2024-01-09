import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CrashController } from './controllers/crash.controller';
import { CrashEntity } from './entities/crash.entity';
import { CrashService } from './services/crash.service';

@Module({
  providers: [CrashService],
  controllers: [CrashController],
  imports: [TypeOrmModule.forFeature([CrashEntity])],
  exports: [CrashService],
})
export class CrashModule {}
