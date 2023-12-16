import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssetDTO, UpdateAssetDTO } from '../dto/asset.dto';
import { AssetService } from '../services/asset.service';
import { AssetInspection } from '../dto/all-asset.dto';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('asset')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('')
  public async createAsset(@Body() body: AssetDTO) {
    return await this.assetService.createAsset(body);
  }

  @Get('')
  public async getAssets() {
    return await this.assetService.getAssets();
  }

  @Get(':assetId')
  public async getAssetById(@Param('assetId') id: string) {
    return await this.assetService.getAssetById(id);
  }

  @Put(':assetId')
  public async updateAsset(
    @Param('assetId') id: string,
    @Body() body: UpdateAssetDTO,
  ) {
    return await this.assetService.updateAsset(id, body);
  }

  @Delete(':assetId')
  public async deleteAsset(@Param('assetId') id: string) {
    return await this.assetService.deleteAsset(id);
  }

  @Post('inspection/:brokerId/:clientId')
  public async createInspection(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Body() requestData: AssetInspection,
  ) {
    const result = await this.assetService.createInspection(
      brokerId,
      clientId,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Get('inspections-client/:userBrokerId')
  public async getInspectionsOfClients(@Param('userBrokerId') userBrokerId: string) {
    return await this.assetService.getInspectionsOfClients(userBrokerId);
  }

  @Get('broker-clients/:userBrokerId')
  public async getAllClientsInBroker(
    @Param('userBrokerId') userBrokerId: string,
  ) {
    return await this.assetService.getAllClientsInBroker(userBrokerId);
  }

  @Get('client-elements/:clientId')
  public async getAllElementsFromClient(@Param('clientId') clientId: string) {
    return await this.assetService.getAllElementsFromClient(clientId);
  }

  @Get('all-read/:userId')
  public async allRead(@Param('userId') userId: string) {
    return await this.assetService.allRead(userId);
  }
}
