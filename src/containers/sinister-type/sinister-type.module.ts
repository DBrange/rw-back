import { Module } from '@nestjs/common';
import { SinisterTypeService } from './services/sinister-type.service';
import { SinisterTypeController } from './controllers/sinister-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { SinisterTypeEntity } from './entities/sinister-type.entity';

@Module({
  providers: [SinisterTypeService],
  controllers: [SinisterTypeController],
  imports: [TypeOrmModule.forFeature([SinisterTypeEntity])],
  exports: [SinisterTypeService],
})
export class SinisterTypeModule {}
