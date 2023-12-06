import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TheftDTO, UpdateTheftDTO } from '../dto/theft.dto';
import { TheftService } from '../services/theft.service';

@Controller('theft')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TheftController {
  constructor(private readonly theftService: TheftService) {}

  @Post('')
  public async createTheft(@Body() body: TheftDTO) {
    return await this.theftService.createTheft(body);
  }

  @Get('')
  public async getThefts() {
    return await this.theftService.getThefts();
  }

  @Get(':theftId')
  public async getTheftById(@Param('theftId') id: string) {
    return await this.theftService.getTheftById(id);
  }

  @Put(':theftId')
  public async updateTheft(
    @Param('theftId') id: string,
    @Body() body: UpdateTheftDTO,
  ) {
    return await this.theftService.updateTheft(id, body);
  }

  @Delete(':theftId')
  public async deleteTheft(@Param('theftId') id: string) {
    return await this.theftService.deleteTheft(id);
  }
}
