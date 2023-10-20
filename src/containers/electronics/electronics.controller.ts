import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ElectronicsService } from './electronics.service';
import { ElectronicsDTO } from './dto/electronics.dto';
import { Electronics } from './entities/electronics.entity';

@Controller('electronics')
export class ElectronicsController {
  constructor(private readonly electronicsService: ElectronicsService) {}

  @Get('all')
  public async getAllElectronics(): Promise<Electronics[]> {
    return this.electronicsService.getAllElectronics();
  }

  @Get(':id')
  public async getElectronicById(
    @Param('id') id: string,
  ): Promise<Electronics> {
    return this.electronicsService.getElectronicById(id);
  }

  @Post('create')
  public async createElectronics(@Body() body: ElectronicsDTO) {
    return await this.electronicsService.createElectronics(body);
  }
}
