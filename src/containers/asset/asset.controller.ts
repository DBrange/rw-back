import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetDTO } from './dto/asset.dto';
import {
  AssetElectronicLegalUser,
  AssetElectronicUser,
  AssetVehicleLegalUserGncDTO,
  AssetVehicleUserGncDTO,
  AssetsInspectionsLegalUserDTO,
  AssetsInspectionsUserDTO,
} from './dto/allAsset.dto';
import { AssetEntity } from './entities/asset.entity';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('all')
  public async getAllAssets(): Promise<AssetEntity[]> {
    return this.assetService.getAllAssets();
  }

  @Get(':id')
  public async getAssetsById(@Param('id') id: string): Promise<AssetEntity> {
    return this.assetService.getAssetsById(id);
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

  @Get(':id')
  public async getAssetByUser(@Param('id') id: string): Promise<AssetEntity[]> {
    return this.assetService.getAssetByUser(id);
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

  @Post('inspection/create')
  public async createaAssetInspections(@Body() body: AssetDTO) {
    return await this.assetService.createaAssetInspections(body);
  }

  @Post('inspection-user/create')
  public async createInspectionsUserNewAssets(
    @Body() requestData: AssetsInspectionsUserDTO,
  ) {
    const result = await this.assetService.createInspectionsUserNewAssets(
      requestData.userDTO, 
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('inspection-legal-user/create')
  public async createInspectionsLegalUserNewAssets(
    @Body() requestData: AssetsInspectionsLegalUserDTO,
  ) {
    const result = await this.assetService.createInspectionsLegalUserNewAssets(
      requestData.legalUserDTO, 
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

}
