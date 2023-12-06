import { Module } from '@nestjs/common';
import { InjuredService } from './services/injured.service';
import { InjuredController } from './controllers/injured.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { InjuredEntity } from './entities/injured.entity';

@Module({
  providers: [InjuredService],
  controllers: [InjuredController],
  imports: [TypeOrmModule.forFeature([InjuredEntity])],
  exports: [InjuredService],
})
export class InjuredModule {}
