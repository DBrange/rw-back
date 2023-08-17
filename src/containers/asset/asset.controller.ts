import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetDTO } from './dto/asset.dto';
import { AssetVehicleLegalUserGncDTO, AssetVehicleUserGncDTO } from './dto/vehicle.user.dto';

@Controller('asset')
export class AssetController {
     constructor(private readonly assetService: AssetService){}

     @Post('create')
     public async createaAsset(@Body() body: AssetDTO){
          return await this.assetService.createAsset(body)
     };

     @Post('user')
       public async createVehicleAndGnc(@Body() requestData: AssetVehicleUserGncDTO) {
          const result = await this.assetService.CreateUserVehicle
          (requestData.vehicleDTO, requestData.gncDTO, requestData.userDTO, requestData.assetDTO );
          return result;
        };

     @Post('legalAsset')
     public async CreateLegalUserVehicle(@Body() requestData: AssetVehicleLegalUserGncDTO){
          const result = await this.assetService.CreateLegalUserVehicle
          (requestData.vehicleDTO, requestData.gncDTO, requestData.legalUserDTO, requestData.assetDTO );
          return result;
     };
     

};
