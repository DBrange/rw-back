import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GncDTO, UpdateGncDTO } from '../dto/gnc.dto';
import { GncService } from '../services/gnc.service';

@Controller('gnc')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class GncController {
  constructor(private readonly gncService: GncService) {}

  @Post('')
  public async createGnc(@Body() body: GncDTO) {
    return await this.gncService.createGnc(body);
  }

  @Get('')
  public async getGncs() {
    return await this.gncService.getGncs();
  }

  @Get(':gncId')
  public async getGncById(@Param('gncId') gncId: string) {
    return await this.gncService.getGncById(gncId);
  }

  @Put(':gncId')
  public async updateGnc(
    @Param('gncId') gncId: string,
    @Body() body: UpdateGncDTO,
  ) {
    return await this.gncService.updateGnc(gncId, body);
  }

  @Delete(':gncId')
  public async deleteGnc(@Param('gncId') gncId: string) {
    return await this.gncService.deleteGnc(gncId);
  }
}
