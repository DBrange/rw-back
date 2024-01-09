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
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import {
  SinisterCrash,
  SinisterCrashInspection,
  SinisterDamage,
  SinisterDamageInspection,
  SinisterElement,
  SinisterFire,
  SinisterFireInspection,
  SinisterTheft,
  SinisterTheftInspection,
} from '../dto/all-sinister.dto';
import { SinisterDTO, UpdateSinisterDTO } from '../dto/sinister.dto';
import { SinisterService } from '../services/sinister.service';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('sinister')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class SinisterController {
  constructor(private readonly sinisterService: SinisterService) {}

  @Post('')
  public async createSinister(@Body() body: SinisterDTO) {
    return await this.sinisterService.createSinister(body);
  }

  @Get('')
  public async getSinisters() {
    return await this.sinisterService.getSinisters();
  }

  @PublicAccess()
  @Get('sinisters')
  public async getSinistersForAdmin(
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('typeToFilterReport') typeToFilterReport?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.sinisterService.getSinistersForAdmin(
      searchField,
      typeToFilter,
      typeToFilterReport,
      page,
      limit,
    );
  }

  // @AdminAccess()
  @PublicAccess()
  @Get('admin/dashboard/documents')
  public async dashboardDocuments() {
    return await this.sinisterService.dashboardDocuments();
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Get(':sinisterId')
  public async getSinisterById(@Param('sinisterId') id: string) {
    return await this.sinisterService.getSinisterById(id);
  }

  @Put(':sinisterId')
  public async updateSinister(
    @Param('sinisterId') id: string,
    @Body() body: UpdateSinisterDTO,
  ) {
    return await this.sinisterService.updateSinister(id, body);
  }

  @Delete(':sinisterId')
  public async deleteSinister(@Param('sinisterId') id: string) {
    return await this.sinisterService.deleteSinister(id);
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('theft/:brokerId/:clientId')
  public async createSinisterTheft(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Body() requestData: SinisterTheft,
  ) {
    return await this.sinisterService.createSinisterTheft(
      brokerId,
      clientId,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('fire/:brokerId/:clientId')
  public async createSinisterFire(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Body() requestData: SinisterFire,
  ) {
    return await this.sinisterService.createSinisterFire(
      brokerId,
      clientId,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.fireDTO,
      requestData.injuredDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('crash/:brokerId/:clientId')
  public async createSinisterCrash(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Body() requestData: SinisterCrash,
  ) {
    return await this.sinisterService.createSinisterCrash(
      brokerId,
      clientId,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.crashDTO,
      requestData.injuredDTO,
      requestData.thirdPartyVehicleDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('damage/:brokerId/:clientId')
  public async createSinisterDamage(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Body() requestData: SinisterDamage,
  ) {
    return await this.sinisterService.createSinisterDamage(
      brokerId,
      clientId,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.electronicDTO,
      requestData.smartphoneDTO,
      requestData.damageDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('theft-inspection/:brokerId/:clientId/:assetId')
  public async createSinisterTheftInInspection(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterTheftInspection,
  ) {
    const result = await this.sinisterService.createSinisterTheftInInspection(
      brokerId,
      clientId,
      assetId,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('fire-inspection/:brokerId/:clientId/:assetId')
  public async createSinisterFireInInspection(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterFireInspection,
  ) {
    const result = await this.sinisterService.createSinisterFireInInspection(
      brokerId,
      clientId,
      assetId,
      requestData.fireDTO,
      requestData.injuredDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('crash-inspection/:brokerId/:clientId/:assetId')
  public async createSinisterCrashInInspection(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterCrashInspection,
  ) {
    const result = await this.sinisterService.createSinisterCrashInInspection(
      brokerId,
      clientId,
      assetId,
      requestData.crashDTO,
      requestData.injuredDTO,
      requestData.thirdPartyVehicleDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  // @Roles('CLIENT', 'BROKER')
  @PublicAccess()
  @Post('damage-inspection/:brokerId/:clientId/:assetId')
  public async createSinisterDamageInInspection(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterDamageInspection,
  ) {
    const result = await this.sinisterService.createSinisterDamageInInspection(
      brokerId,
      clientId,
      assetId,
      requestData.damageDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  // @Roles('BROKER', 'CLIENT')
  @PublicAccess()
  @Get('client/:clientId')
  public async getSinistersOfClient(
    @Param('clientId') clientId: string,
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('typeToFilterReport') typeToFilterReport?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.sinisterService.getSinistersOfClient(
      clientId,
      searchField,
      typeToFilter,
      typeToFilterReport,
      page,
      limit,
    );
  }

  // @Roles('CLIENT', 'BROKER', 'ADMIN')
  @PublicAccess()
  @Get('client-detail/:brokerId/:clientId')
  public async getClientInBroker(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
  ) {
    return await this.sinisterService.getClientInBroker(brokerId, clientId);
  }

  @PublicAccess()
  @Get('broker/:brokerId')
  public async getSinistersOfBroker(
    @Param('brokerId') brokerId: string,
    @Query('searchField') searchField?: string,
    @Query('typeToFilter') typeToFilter?: string,
    @Query('typeToFilterReport') typeToFilterReport?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.sinisterService.getSinistersOfBroker(
      brokerId,
      searchField,
      typeToFilter,
      typeToFilterReport,
      page,
      limit,
    );
  }

  // @Post('element/:elementId')
  // public async createSinisterInElement(
  //   @Param('elementId') elementId: string,
  //   @Body() requestData: SinisterElement,
  // ) {
  //   const result = await this.sinisterService.createSinisterInElement(
  //     elementId,
  //     requestData.theftDTO,
  //     requestData.theftTireDTO,
  //     requestData.fireDTO,
  //     requestData.crashDTO,
  //     requestData.injuredDTO,
  //     requestData.thirdPartyVehicleDTO,
  //     requestData.damageDTO,
  //     requestData.swornDeclaration,
  //   );

  //   return result;
  // }

  // @AdminAccess()
  @PublicAccess()
  @Get('dashboard/:brokerId/:userBrokerId')
  public async getBrokerDashboard(
    @Param('brokerId') brokerId: string,
    @Param('userBrokerId') userBrokerId: string,
  ) {
    const result = await this.sinisterService.getBrokerDashboard(
      brokerId,
      userBrokerId,
    );

    return result;
  }
  
  // @AdminAccess()
  @PublicAccess()
  @Get('broker-detail/:userId')
  public async getBrokerDetailForAdmin(@Param('userId') userId: string) {
    const result = await this.sinisterService.getBrokerDetailForAdmin(userId);

    return result;
  }
}
