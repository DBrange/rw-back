import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { GncService } from './gnc.service';
import { GncDTO } from './dto/gnc.dto';
import { Gnc } from './entities/gnc.entity';

@Controller('gnc')
export class GncController {
  constructor(private readonly gncService: GncService) {}

  @Get('all')
  public async getAllGnc(): Promise<Gnc[]> {
    return this.gncService.getAllGnc();
  }

  @Get(':id')
  public async getGncById(@Param('id') id: string): Promise<Gnc> {
    return this.gncService.getGncById(id);
  }

  @Post('create')
  public async createGnc(@Body() body: GncDTO) {
    return await this.gncService.createGnc(body);
  }
}
