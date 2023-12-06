import { Module } from '@nestjs/common';
import { CrashService } from './services/crash.service';
import { CrashController } from './controllers/crash.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { CrashEntity } from './entities/crash.entity';

@Module({
  providers: [CrashService],
  controllers: [CrashController],
  imports: [TypeOrmModule.forFeature([CrashEntity])],
  exports: [CrashService],
})
export class CrashModule {}
