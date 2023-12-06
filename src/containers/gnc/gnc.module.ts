import { Module } from '@nestjs/common';
import { GncService } from './services/gnc.service';
import { GncController } from './controllers/gnc.controller';
import { GncEntity } from './entities/gnc.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [GncService],
  controllers: [GncController],
  imports: [TypeOrmModule.forFeature([GncEntity])],
  exports: [GncService],
})
export class GncModule {}
