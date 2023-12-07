import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserInBrokerService } from '../services/user-in-broker.service';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user-in-broker')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UserInBrokerController {
  constructor(private readonly userInBrokerService: UserInBrokerService) {}

  @Post(':brokerId/:clientId')
  public async addClient(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.userInBrokerService.addClient(brokerId, clientId);
  }
}
