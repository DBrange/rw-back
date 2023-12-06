import { Module } from '@nestjs/common';
import { ThirdPartyDriverService } from './services/third-party-driver.service';
import { ThirdPartyDriverController } from './controllers/third-party-driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ThirdPartyDriverEntity } from './entities/third-party-driver.entity';

@Module({
  providers: [ThirdPartyDriverService],
  controllers: [ThirdPartyDriverController],
  imports: [TypeOrmModule.forFeature([ThirdPartyDriverEntity])],
  exports: [ThirdPartyDriverService],
})
export class ThirdPartyDriverModule {}
