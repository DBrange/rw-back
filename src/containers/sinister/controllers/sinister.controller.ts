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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

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

  @Post('theft-inspection/:assetId')
  public async createSinisterTheftInInspection(
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterTheftInspection,
  ) {
    const result = await this.sinisterService.createSinisterTheftInInspection(
      assetId,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  @Post('fire-inspection/:assetId')
  public async createSinisterFireInInspection(
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterFireInspection,
  ) {
    const result = await this.sinisterService.createSinisterFireInInspection(
      assetId,
      requestData.fireDTO,
      requestData.injuredDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  @Post('fire-inspection/:assetId')
  public async createSinisterCrashInInspection(
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterCrashInspection,
  ) {
    const result = await this.sinisterService.createSinisterCrashInInspection(
      assetId,
      requestData.crashDTO,
      requestData.injuredDTO,
      requestData.thirdPartyVehicleDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  @Post('damage-inspection/:assetId')
  public async createSinisterDamageInInspection(
    @Param('assetId') assetId: string,
    @Body() requestData: SinisterDamageInspection,
  ) {
    const result = await this.sinisterService.createSinisterDamageInInspection(
      assetId,
      requestData.damageDTO,
      requestData.swornDeclaration,
    );

    return result;
  }

  @Get('client/:clientId')
  public async getSinistersOfClient(@Param('clientId') clientId: string) {
    return await this.sinisterService.getSinistersOfClient(clientId);
  }

  @PublicAccess()
  @Get('broker/:brokerId')
  public async getSinistersOfBroker(@Param('brokerId') brokerId: string) {
    return await this.sinisterService.getSinistersOfBroker(brokerId);
  }

  @Post('element/:elementId')
  public async createSinisterInElement(
    @Param('elementId') elementId: string,
    @Body() requestData: SinisterElement,
  ) {
    const result = await this.sinisterService.createSinisterInElement(
      elementId,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.fireDTO,
      requestData.crashDTO,
      requestData.injuredDTO,
      requestData.thirdPartyVehicleDTO,
      requestData.damageDTO,
      requestData.swornDeclaration,
    );

    return result;
  }
}
