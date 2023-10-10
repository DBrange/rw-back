import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SinisterService } from './sinister.service';
import { SinisterDTO } from './dto/sinister.dto';
import {
  SinisterLegalUserElectronicTheftDTO,
  SinisterLegalUserVehicleCrashDTO,
  SinisterLegalUserVehicleFireDTO,
  SinisterUserElectronicTheftDTO,
  SinisterUserVehicleCrashDTO,
  SinisterUserVehicleFireDTO,
  SinisterUserVehicleTheftDTO,
  SinisterlegalUserVehicleTheftDTO,
} from './dto/allSinister.dto';
import { Sinister } from './entities/sinister.entity';

@Controller('sinister')
export class SinisterController {
  constructor(private readonly sinisterService: SinisterService) {}

  @Get('all')
  public async getAllVehicles(): Promise<Sinister[]> {
    return this.sinisterService.getAllVehicles();
  }

  @Get(':id')
  public async getVehicleById(@Param('id') id: string): Promise<Sinister> {
    return this.sinisterService.getVehicleById(id);
  }

  @Post('create')
  public async createSinister(@Body() body: SinisterDTO) {
    //body.date = new Date(body.date);
    return await this.sinisterService.createSinister(body);
  }

  @Post('user-vehicle-theft')
  public async createUserVehicleTheft(
    @Body() requestData: SinisterUserVehicleTheftDTO,
  ) {
    const result = await this.sinisterService.createUserVehicleTheft(
      requestData.userDTO,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('user-vehicle-fire')
  public async createUserVehicleFire(
    @Body() requestData: SinisterUserVehicleFireDTO,
  ) {
    const result = await this.sinisterService.createUserVehicleFire(
      requestData.userDTO,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.fireDTO,
      requestData.injuredDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('user-vehicle-crash')
  public async createUserVehicleCrash(
    @Body() requestData: SinisterUserVehicleCrashDTO,
  ) {
    const result = await this.sinisterService.createUserVehicleCrash(
      requestData.userDTO,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.crashDTO,
      requestData.injuredDTO,
      requestData.thirdPartyVehicleDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('legalUser-vehicle-theft')
  public async createLegalUserVehicleTheft(
    @Body() requestData: SinisterlegalUserVehicleTheftDTO,
  ) {
    const result = await this.sinisterService.createLegalUserVehicleTheft(
      requestData.legalUserDTO,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('legalUser-vehicle-fire')
  public async createLegalUserVehicleFire(
    @Body() requestData: SinisterLegalUserVehicleFireDTO,
  ) {
    const result = await this.sinisterService.createLegalUserVehicleFire(
      requestData.legalUserDTO,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.fireDTO,
      requestData.injuredDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('legalUser-vehicle-crash')
  public async createLegalUserVehicleCrash(
    @Body() requestData: SinisterLegalUserVehicleCrashDTO,
  ) {
    console.log(requestData);
    const result = await this.sinisterService.createLegalUserVehicleCrash(
      requestData.legalUserDTO,
      requestData.vehicleDTO,
      requestData.gncDTO,
      requestData.crashDTO,
      requestData.injuredDTO,
      requestData.thirdPartyVehicleDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('user-electronic-theft')
  public async createUserElectronicTheft(
    @Body() requestData: SinisterUserElectronicTheftDTO,
  ) {
    const result = await this.sinisterService.createUserElectronicTheft(
      requestData.userDTO,
      requestData.electronicDTO,
      requestData.smartPhoneDTO,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }

  @Post('legalUser-electronic-theft')
  public async createLegalUserElectronicTheft(
    @Body() requestData: SinisterLegalUserElectronicTheftDTO,
  ) {
    const result = await this.sinisterService.createLegalUserElectronicTheft(
      requestData.legalUserDTO,
      requestData.electronicDTO,
      requestData.smartPhoneDTO,
      requestData.theftDTO,
      requestData.theftTireDTO,
      requestData.assetDTO,
      requestData.swornDeclaration,
    );
    return result;
  }
}
