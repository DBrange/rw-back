import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssetInspection } from '../dto/all-asset.dto';
import { AssetDTO, UpdateAssetDTO } from '../dto/asset.dto';
import { AssetService } from '../services/asset.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PublicAccess } from '../../../auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('asset')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
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

  // @Roles('BROKER')
  @PublicAccess()
  @Get('inspections')
  public async getAssetsForAdmin(
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.assetService.getAssetsForAdmin(
      searchField,
      typeToFilter,
      page,
      limit,
    );
  }

  // @Roles('BROKER', 'ADMIN')
  @PublicAccess()
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

  @PublicAccess()
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

  // @Roles('BROKER','ADMIN')
  @PublicAccess()
  @Get('inspections-client/:brokerId')
  public async getInspectionsOfClients(
    @Param('brokerId') brokerId: string,
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.assetService.getInspectionsOfClients(
      brokerId,
      searchField,
      typeToFilter,
      page,
      limit,
    );
  }

  // @Roles('BROKER')
  @PublicAccess()
  @Get('broker-clients/:userBrokerId')
  public async getAllClientsInBroker(
    @Param('userBrokerId') userBrokerId: string,
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.assetService.getAllClientsInBroker(
      userBrokerId,
      searchField,
      typeToFilter,
      page,
      limit,
    );
  }

  @Get('client-elements/:clientId')
  public async getAllElementsFromClient(@Param('clientId') clientId: string) {
    return await this.assetService.getAllElementsFromClient(clientId);
  }

  // @Roles('CLIENT', 'BROKER', 'ADMIN')
  @PublicAccess()
  @Get('all-read/:userId')
  public async allRead(@Param('userId') userId: string) {
    return await this.assetService.allRead(userId);
  }

  //----------------------------
  // Admin

  // @Get('inspections')
  // public async getAssetsForAdmin(
  //   @Query('searchField') searchField?: string,
  //   @Query('typeToFilter') typeToFilter?: string,
  //   @Query('page') page?: number,
  //   @Query('limit') limit?: number,
  // ) {
  //   return await this.assetService.getAssetsForAdmin(
  //     searchField,
  //     typeToFilter,
  //     page,
  //     limit,
  //   );
  // }
}
