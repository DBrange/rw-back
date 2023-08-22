import { Controller, Body, Post } from '@nestjs/common';
import { TheftTheftTireService } from '../services/theft-theft-tire.service';
import { TheftTheftTireDTO } from '../dto/theft-theft-tire.dto';

@Controller('theft-theft-tire')
export class TheftTheftTireController {
  constructor(private readonly theftTheftTireService: TheftTheftTireService) {}

  @Post('create')
  public async createTheftAndTheftTire(@Body() requestData: TheftTheftTireDTO) {
    return await this.theftTheftTireService.createTheftTheftTire(
      requestData.theftData,
      requestData.theftTireData,
    );
  }
}
