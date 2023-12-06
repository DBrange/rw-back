import { Module } from '@nestjs/common';
import { FireService } from './services/fire.service';
import { FireController } from './controllers/fire.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { FireEntity } from './entities/fire.entity';

@Module({
  providers: [FireService],
  controllers: [FireController],
  imports: [TypeOrmModule.forFeature([FireEntity])],
  exports: [FireService],
})
export class FireModule {}
