import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserBrokerDTO } from '../dto/user-broker.dto';
import { UserBrokerService } from '../services/user-broker.service';

@Controller('user-broker')
export class UserBrokerController {
  constructor(private readonly userBrokerService: UserBrokerService){}
  @Post('register')
  public async registerUserBroker(@Body() body: UserBrokerDTO) {
    return await this.userBrokerService.createUserBroker(body);
  }

  @Get('all')
  public async getAllUsersBroker(){
  return await this.userBrokerService.getusersBroker()
  }
}
