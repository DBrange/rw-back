import { Module } from '@nestjs/common';
import { ElectronicsBrandsController } from './electronics-brands.controller';
import { ElectronicsBrandsService } from './electronics-brands.service';

@Module({
  controllers: [ElectronicsBrandsController],
  providers: [ElectronicsBrandsService]
})
export class ElectronicsBrandsModule {}
