import { Module } from '@nestjs/common';
import { SinisterTypeController } from './sinister-type.controller';
import { SinisterTypeService } from './sinister-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SinisterType } from './entities/sinisterType.entity';
import { Crash } from '../crash/entities/crash.entity';
import { Electronics } from '../electronics/entities/electronics.entity';
import { User } from '../users/entities/user.entity';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SinisterType, Crash, Electronics, User, LegalUsers])],
  controllers: [SinisterTypeController],
  providers: [SinisterTypeService],
  exports: [SinisterTypeService]
})
export class SinisterTypeModule {}
