import { Module } from '@nestjs/common';
import { NewCarDataController } from './new-car-data.controller';
import { NewCarDataService } from './new-car-data.service';

@Module({
  controllers: [NewCarDataController],
  providers: [NewCarDataService]
})
export class NewCarDataModule {}
