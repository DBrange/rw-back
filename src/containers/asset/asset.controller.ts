import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetDTO } from './dto/asset.dto';

@Controller('asset')
export class AssetController {
     constructor(private readonly assetService: AssetService){}

     @Post('create')
     public async createaAsset(@Body() body: AssetDTO){
          return await this.assetService.createAsset(body)
     };
};
