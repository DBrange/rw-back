import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateUserBrokerDTO, UserBrokerDTO } from '../dto/user-broker.dto';
import { UserBrokerService } from '../services/user-broker.service';

@Controller('user-broker')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UserBrokerController {
  constructor(private readonly userBrokerService: UserBrokerService) {}

  @Post('')
  public async createUserBroker(@Body() body: UserBrokerDTO) {
    return await this.userBrokerService.createUserBroker(body);
  }

  @Get('')
  public async getUsersBroker() {
    return await this.userBrokerService.getUsersBroker();
  }

  @Get(':userBrokerId')
  public async getUserBrokerById(@Param('userBrokerId') id: string) {
    return await this.userBrokerService.getUserBrokerById(id);
  }

  @Put(':userBrokerId')
  public async updateUserBroker(
    @Param('userBrokerId') id: string,
    @Body() body: UpdateUserBrokerDTO,
  ) {
    return await this.userBrokerService.updateUserBroker(id, body);
  }

  @Delete(':userBrokerId')
  public async deleteUserBroker(@Param('userBrokerId') id: string) {
    return await this.userBrokerService.deleteUserBroker(id);
  }
}
