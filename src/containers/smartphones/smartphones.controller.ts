import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SmartphonesService } from './smartphones.service';
import { SmartphoneDTO } from './dto/smartphone.dto';
import { Smartphone } from './entities/smartphone.entity';

@Controller('smartphones')
export class SmartphonesController {
  constructor(private readonly smartphonesService: SmartphonesService) {}

  @Get('all')
  public async getAllSmartphone(): Promise<Smartphone[]> {
    return this.smartphonesService.getAllSmartphone();
  }

  @Get(':id')
  public async getSmartphoneById(@Param('id') id: string): Promise<Smartphone> {
    return this.smartphonesService.getSmartphoneById(id);
  }

  @Post('create')
  public async createSmartphone(@Body() body: SmartphoneDTO) {
    return await this.smartphonesService.createSmartphone(body);
  }
}
