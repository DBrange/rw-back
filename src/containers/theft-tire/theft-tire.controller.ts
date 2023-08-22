import { Controller, Post, Body } from '@nestjs/common';
import { TheftTireDTO } from './dto/theftTire.dto';
import { TheftTireService } from './theft-tire.service';

@Controller('theft-tire')
export class TheftTireController {
  constructor(private readonly theftTireService: TheftTireService) {}

  @Post('create')
  public async createTheftTire(@Body() body: TheftTireDTO) {
    return await this.theftTireService.createTheftTire(body);
  }
}
