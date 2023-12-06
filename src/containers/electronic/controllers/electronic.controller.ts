import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ElectronicDTO, UpdateElectronicDTO } from '../dto/electronic.dto';
import { ElectronicService } from '../services/electronic.service';

@Controller('electronic')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ElectronicController {
  constructor(private readonly electronicService: ElectronicService) {}

  @Post('')
  public async createElectronic(@Body() body: ElectronicDTO) {
    return await this.electronicService.createElectronic(body);
  }

  @Get('')
  public async getElectronics() {
    return await this.electronicService.getElectronics();
  }

  @Get(':electronicId')
  public async getElectronicById(@Param('electronicId') id: string) {
    return await this.electronicService.getElectronicById(id);
  }

  @Put(':electronicId')
  public async updateElectronic(
    @Param('electronicId') id: string,
    @Body() body: UpdateElectronicDTO,
  ) {
    return await this.electronicService.updateElectronic(id, body);
  }

  @Delete(':electronicId')
  public async deleteElectronic(@Param('electronicId') id: string) {
    return await this.electronicService.deleteElectronic(id);
  }
}
