import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DamageDTO, UpdateDamageDTO } from '../dto/damage.dto';
import { DamageService } from '../services/damage.service';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('damage')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class DamageController {
  constructor(private readonly damageService: DamageService) {}

  @Post('')
  public async createDamage(@Body() body: DamageDTO) {
    return await this.damageService.createDamage(body);
  }

  @Get('')
  public async getDamages() {
    return await this.damageService.getDamages();
  }

  @Get(':damageId')
  public async getDamageById(@Param('damageId') id: string) {
    return await this.damageService.getDamageById(id);
  }

  @Put(':damageId')
  public async updateDamage(
    @Param('damageId') id: string,
    @Body() body: UpdateDamageDTO,
  ) {
    return await this.damageService.updateDamage(id, body);
  }

  @Delete(':damageId')
  public async deleteDamage(@Param('damageId') id: string) {
    return await this.damageService.deleteDamage(id);
  }
}
