import { Module } from '@nestjs/common';
import { AssetSinisterController } from './asset-sinister.controller';
import { AssetSinisterService } from './asset-sinister.service';

@Module({
  controllers: [AssetSinisterController],
  providers: [AssetSinisterService]
})
export class AssetSinisterModule {}
