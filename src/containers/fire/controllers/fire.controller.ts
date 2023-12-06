import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FireDTO, UpdateFireDTO } from '../dto/fire.dto';
import { FireService } from '../services/fire.service';

@Controller('fire')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class FireController {
  constructor(private readonly fireService: FireService) {}

  @Post('')
  public async createFire(@Body() body: FireDTO) {
    return await this.fireService.createFire(body);
  }

  @Get('')
  public async getFires() {
    return await this.fireService.getFires();
  }

  @Get(':fireId')
  public async getFireById(@Param('fireId') id: string) {
    return await this.fireService.getFireById(id);
  }

  @Put(':fireId')
  public async updateFire(
    @Param('fireId') id: string,
    @Body() body: UpdateFireDTO,
  ) {
    return await this.fireService.updateFire(id, body);
  }

  @Delete(':fireId')
  public async deleteFire(@Param('fireId') id: string) {
    return await this.fireService.deleteFire(id);
  }
}
