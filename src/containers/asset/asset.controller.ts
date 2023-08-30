import { Body, Controller, Post } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetDTO } from './dto/asset.dto';
import { AssetElectronicLegalUser, AssetElectronicUser, AssetVehicleLegalUserGncDTO, AssetVehicleUserGncDTO } from './dto/allAsset.dto';

@Controller('asset')
export class AssetController {
     constructor(private readonly assetService: AssetService){}

     @Post('create')
     public async createaAsset(@Body() body: AssetDTO){
          return await this.assetService.createAsset(body)
     };

     @Post('user')
       public async createVehicleAndGnc(@Body() requestData: AssetVehicleUserGncDTO) {
          const result = await this.assetService.CreateUserVehicle(
            requestData.vehicleDTO,
            requestData.gncDTO,
            requestData.userDTO,
            requestData.assetDTO,
            requestData.swornDeclaration,
          );
          return result;
        };

     @Post('legalAsset')
     public async CreateLegalUserVehicle(@Body() requestData: AssetVehicleLegalUserGncDTO){
          const result = await this.assetService.CreateLegalUserVehicle
          (requestData.vehicleDTO, requestData.gncDTO, requestData.legalUserDTO, requestData.assetDTO,requestData.swornDeclaration );
          return result;
     };
     
     @Post('electronicAsset')
     public async CreateUserElectronic(@Body() requestData:AssetElectronicUser){
          const result = await this.assetService.CreateUserElectronic
          (requestData.electronicDTO, requestData.smartphoneDTO, requestData.userDTO, requestData.assetDTO,requestData.swornDeclaration);
          return result;
     }

     @Post('electronicAssetL')
     public async CreateLegalUserElectronic(@Body() requestData: AssetElectronicLegalUser){
          const result = await this.assetService.CreateLegalUserElectronic
          (requestData.electronicDTO, requestData.smartphoneDTO, requestData.legalUserDTO, requestData.assetDTO,requestData.swornDeclaration);
          return result;
     }
};
