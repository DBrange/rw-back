import { Module } from '@nestjs/common';
import { InjuredInfoService } from './services/injured-info.service';
import { InjuredInfoController } from './controllers/injured-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { InjuredInfoEntity } from './entities/injured-info.entity';

@Module({
  providers: [InjuredInfoService],
  controllers: [InjuredInfoController],
  imports: [TypeOrmModule.forFeature([InjuredInfoEntity])],
  exports: [InjuredInfoService],
})
export class InjuredInfoModule {}
