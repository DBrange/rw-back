import { Module } from '@nestjs/common';
import { ThirdPartyDriverController } from './third-party-driver.controller';
import { ThirdPartyDriverService } from './third-party-driver.service';

@Module({
  controllers: [ThirdPartyDriverController],
  providers: [ThirdPartyDriverService]
})
export class ThirdPartyDriverModule {}
