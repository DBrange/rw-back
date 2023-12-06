import { Module } from '@nestjs/common';
import { TheftTheftTireService } from './services/theft-theft-tire.service';
import { TheftTheftTireController } from './controllers/theft-theft-tire.controller';

@Module({
  providers: [TheftTheftTireService],
  controllers: [TheftTheftTireController]
})
export class TheftTheftTireModule {}
