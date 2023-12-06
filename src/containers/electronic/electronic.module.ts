import { Module } from '@nestjs/common';
import { ElectronicService } from './services/electronic.service';
import { ElectronicController } from './controllers/electronic.controller';
import { ElectronicEntity } from './entities/electronic.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  providers: [ElectronicService],
  controllers: [ElectronicController],
  imports: [TypeOrmModule.forFeature([ElectronicEntity])],
  exports: [ElectronicService],
})
export class ElectronicModule {}
