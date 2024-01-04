import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SmartphoneDTO, UpdateSmartphoneDTO } from '../dto/smartphone.dto';
import { SmartphoneService } from '../services/smartphone.service';

@Controller('smartphone')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class SmartphoneController {
  constructor(private readonly smartphoneService: SmartphoneService) {}

  @Post('')
  public async createSmartphone(@Body() body: SmartphoneDTO) {
    return await this.smartphoneService.createSmartphone(body);
  }

  @Get('')
  public async getSmartphones() {
    return await this.smartphoneService.getSmartphones();
  }

  @Get('verify-imei')
  public async verifyImei(@Query('imei') imei: string) {
    return await this.smartphoneService.verifyImei(imei);
  }

  @Get(':smartphoneId')
  public async getSmartphoneById(@Param('smartphoneId') id: string) {
    return await this.smartphoneService.getSmartphoneById(id);
  }

  @Put(':smartphoneId')
  public async updateSmartphone(
    @Param('smartphoneId') id: string,
    @Body() body: UpdateSmartphoneDTO,
  ) {
    return await this.smartphoneService.updateSmartphone(id, body);
  }

  @Delete(':smartphoneId')
  public async deleteSmartphone(@Param('smartphoneId') id: string) {
    return await this.smartphoneService.deleteSmartphone(id);
  }
}
