import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SinisterTypeDTO, UpdateSinisterTypeDTO } from '../dto/sinister-type.dto';
import { SinisterTypeService } from '../services/sinister-type.service';

@Controller('sinister-type')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class SinisterTypeController {
  constructor(private readonly sinisterTypeService: SinisterTypeService) {}

  @Post('')
  public async createSinisterType(@Body() body: SinisterTypeDTO) {
    return await this.sinisterTypeService.createSinisterType(body);
  }

  @Get('')
  public async getSinisterTypes() {
    return await this.sinisterTypeService.getSinisterTypes();
  }

  @Get(':sinisterTypeId')
  public async getSinisterTypeById(@Param('sinisterTypeId') id: string) {
    return await this.sinisterTypeService.getSinisterTypeById(id);
  }

  @Put(':sinisterTypeId')
  public async updateSinisterType(
    @Param('sinisterTypeId') id: string,
    @Body() body: UpdateSinisterTypeDTO,
  ) {
    return await this.sinisterTypeService.updateSinisterType(id, body);
  }

  @Delete(':sinisterTypeId')
  public async deleteSinisterType(@Param('sinisterTypeId') id: string) {
    return await this.sinisterTypeService.deleteSinisterType(id);
  }
}