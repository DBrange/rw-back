import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CrashDTO, UpdateCrashDTO } from '../dto/crash.dto';
import { CrashService } from '../services/crash.service';

@Controller('crash')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class CrashController {
  constructor(private readonly crashService: CrashService) {}

  @Post('')
  public async createCrash(@Body() body: CrashDTO) {
    return await this.crashService.createCrash(body);
  }

  @Get('')
  public async getCrashs() {
    return await this.crashService.getCrashs();
  }

  @Get(':crashId')
  public async getCrashById(@Param('crashId') id: string) {
    return await this.crashService.getCrashById(id);
  }

  @Put(':crashId')
  public async updateCrash(
    @Param('crashId') id: string,
    @Body() body: UpdateCrashDTO,
  ) {
    return await this.crashService.updateCrash(id, body);
  }

  @Delete(':crashId')
  public async deleteCrash(@Param('crashId') id: string) {
    return await this.crashService.deleteCrash(id);
  }
}
