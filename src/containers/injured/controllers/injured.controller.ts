import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InjuredDTO, UpdateInjuredDTO } from '../dto/injured.dto';
import { InjuredService } from '../services/injured.service';

@Controller('injured')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class InjuredController {
  constructor(private readonly injuredService: InjuredService) {}

  @Post('')
  public async createInjured(@Body() body: InjuredDTO) {
    return await this.injuredService.createInjured(body);
  }

  @Get('')
  public async getInjureds() {
    return await this.injuredService.getInjureds();
  }

  @Get(':injuredId')
  public async getInjuredById(@Param('injuredId') id: string) {
    return await this.injuredService.getInjuredById(id);
  }

  @Put(':injuredId')
  public async updateInjured(
    @Param('injuredId') id: string,
    @Body() body: UpdateInjuredDTO,
  ) {
    return await this.injuredService.updateInjured(id, body);
  }

  @Delete(':injuredId')
  public async deleteInjured(@Param('injuredId') id: string) {
    return await this.injuredService.deleteInjured(id);
  }
}
