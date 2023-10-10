import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetDTO } from './dto/asset.dto';
import {
  AssetElectronicLegalUser,
  AssetElectronicUser,
  AssetVehicleLegalUserGncDTO,
  AssetVehicleUserGncDTO,
} from './dto/allAsset.dto';
import { AssetEntity } from './entities/asset.entity';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('all')
  public async getAllAssets(): Promise<AssetEntity[]> {
    return this.assetService.getAllAssets();
  }

  @Get(':id/vehicle')
  public async getAssetVehicleById(
    @Param('id') id: string,
  ): Promise<AssetEntity> {
    return this.assetService.getAssetVehicleById(id);
  }

  @Get(':id/electronics')
  public async getAssetElectronicById(
    @Param('id') id: string,
  ): Promise<AssetEntity> {
    return this.assetService.getAssetElectronicById(id);
  }

  @Post('create')
  public async createaAsset(@Body() body: AssetDTO) {
    return await this.assetService.createAsset(body);
  }

  @Post('user')
  public async createVehicleAndGnc(
    @Body() requestData: AssetVehicleUserGncDTO,
  ) {
    const result = await this.assetService.CreateUserVehicle(
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.userDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('legalAsset')
  public async CreateLegalUserVehicle(
    @Body() requestData: AssetVehicleLegalUserGncDTO,
  ) {
    const result = await this.assetService.CreateLegalUserVehicle(
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.legalUserDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('electronicAsset')
  public async CreateUserElectronic(@Body() requestData: AssetElectronicUser) {
    const result = await this.assetService.CreateUserElectronic(
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.userDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('electronicAssetL')
  public async CreateLegalUserElectronic(
    @Body() requestData: AssetElectronicLegalUser,
  ) {
    const result = await this.assetService.CreateLegalUserElectronic(
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.legalUserDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }
}
