import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { NewCarDataService } from './new-car-data.service';
import { NewCarDataDTO } from './dto/newCarData.dto';
import { NewCarData } from './entities/newCarData.entity';

@Controller('new-car-data')
export class NewCarDataController {
  constructor(private readonly newCarDataService: NewCarDataService) {}

  @Get('all')
  public async getAllNewCardData(): Promise<NewCarData[]> {
    return this.newCarDataService.getAllNewCardData();
  }

  @Get(':id')
  public async getNewCardDataById(
    @Param('id') id: string,
  ): Promise<NewCarData> {
    return this.newCarDataService.getNewCardDataById(id);
  }

  @Post('create')
  public async createNewCarData(@Body() body: NewCarDataDTO) {
    return await this.newCarDataService.createNewCarData(body);
  }
}
