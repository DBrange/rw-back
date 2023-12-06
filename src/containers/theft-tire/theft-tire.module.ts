import { Module } from '@nestjs/common';
import { TheftTireService } from './services/theft-tire.service';
import { TheftTireController } from './controllers/theft-tire.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TheftTireEntity } from './entities/theft-tire.entity';

@Module({
  providers: [TheftTireService],
  controllers: [TheftTireController],
  imports: [TypeOrmModule.forFeature([TheftTireEntity])],
  exports: [TheftTireService],
})
export class TheftTireModule {}
