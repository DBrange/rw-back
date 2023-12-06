import { Module } from '@nestjs/common';
import { SmartphoneService } from './services/smartphone.service';
import { SmartphoneController } from './controllers/smartphone.controller';
import { SmartphoneEntity } from './entities/smartphone.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [SmartphoneService],
  controllers: [SmartphoneController],
  imports: [TypeOrmModule.forFeature([SmartphoneEntity])],
  exports: [SmartphoneService],
})
export class SmartphoneModule {}
