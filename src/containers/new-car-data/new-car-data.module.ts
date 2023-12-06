import { Module } from '@nestjs/common';
import { NewCarDataService } from './services/new-car-data.service';
import { NewCarDataController } from './controllers/new-car-data.controller';

@Module({
  providers: [NewCarDataService],
  controllers: [NewCarDataController]
})
export class NewCarDataModule {}
