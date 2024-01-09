import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InjuredInfoDTO, UpdateInjuredInfoDTO } from '../dto/injured-info.dto';
import { InjuredInfoService } from '../services/injured-info.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('injured-info')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class InjuredInfoController {
  constructor(private readonly injuredInfoService: InjuredInfoService) {}

  @Post('')
  public async createInjuredInfo(@Body() body: InjuredInfoDTO) {
    return await this.injuredInfoService.createInjuredInfo(body);
  }

  @Get('')
  public async getInjuredInfos() {
    return await this.injuredInfoService.getInjuredInfos();
  }

  @Get(':injuredInfoId')
  public async getInjuredInfoById(@Param('injuredInfoId') id: string) {
    return await this.injuredInfoService.getInjuredInfoById(id);
  }

  @Put(':injuredInfoId')
  public async updateInjuredInfo(
    @Param('injuredInfoId') id: string,
    @Body() body: UpdateInjuredInfoDTO,
  ) {
    return await this.injuredInfoService.updateInjuredInfo(id, body);
  }

  @Delete(':injuredInfoId')
  public async deleteInjuredInfo(@Param('injuredInfoId') id: string) {
    return await this.injuredInfoService.deleteInjuredInfo(id);
  }
}
