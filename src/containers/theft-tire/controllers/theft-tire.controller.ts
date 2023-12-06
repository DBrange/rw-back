import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TheftTireDTO, UpdateTheftTireDTO } from '../dto/theft-tire.dto';
import { TheftTireService } from '../services/theft-tire.service';

@Controller('theft-tire')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TheftTireController {
  constructor(private readonly theftTireService: TheftTireService) {}

  @Post('')
  public async createTheftTire(@Body() body: TheftTireDTO) {
    return await this.theftTireService.createTheftTire(body);
  }

  @Get('')
  public async getTheftTires() {
    return await this.theftTireService.getTheftTires();
  }

  @Get(':theftTireId')
  public async getTheftTireById(@Param('theftTireId') id: string) {
    return await this.theftTireService.getTheftTireById(id);
  }

  @Put(':theftTireId')
  public async updateTheftTire(
    @Param('theftTireId') id: string,
    @Body() body: UpdateTheftTireDTO,
  ) {
    return await this.theftTireService.updateTheftTire(id, body);
  }

  @Delete(':theftTireId')
  public async deleteTheftTire(@Param('theftTireId') id: string) {
    return await this.theftTireService.deleteTheftTire(id);
  }
}
