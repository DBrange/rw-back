import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { UserBrokerDTO } from '../dto/user-broker.dto';
import { UserBrokerService } from '../services/user-broker.service';
import { UserBrokerUpdateDTO } from '../entities/user-broker.entity';

@Controller('user-broker')
export class UserBrokerController {
  constructor(private readonly userBrokerService: UserBrokerService) {}
  @Post('register')
  public async registerUserBroker(@Body() body: UserBrokerDTO) {
    return await this.userBrokerService.createUserBroker(body);
  }

  @Get('all')
  public async getAllUsersBroker() {
    return await this.userBrokerService.getusersBroker();
  }

  @Get(':id')
  public async getUserBrokerById(@Param('id') id: string) {
    return await this.userBrokerService.getUserBrokerById(id);
  }

  @Put(':id')
  public async updateUserBroker(
    @Param('id') id: string,
    @Body() body: UserBrokerUpdateDTO,
  ) {
    return await this.userBrokerService.updateUserBroker(id, body);
  }

  // @Post('add-client/:client/:broker')
  // public async addClient(@Param('client') client: string, @Param('broker') broker: string) {
  //   this.userBrokerService.addClient(client, broker)
  // }
}
