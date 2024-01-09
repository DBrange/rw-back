import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserInBrokerService } from '../services/user-in-broker.service';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserInBrokerDTO } from '../dto/user-in-broker.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user-in-broker')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UserInBrokerController {
  constructor(private readonly userInBrokerService: UserInBrokerService) {}

  @PublicAccess()
  @Post('')
  public async notificationForAddClient(@Body() body: UserInBrokerDTO) {
    return await this.userInBrokerService.notificationForAddClient(
      body.brokerId,
      body.clientId,
      body.userBrokerId,
      body.name,
      body.lastname,
      body.clientName,
      body.clientLastname,
    );
  }

  // @Post('delete-broker/:clietnId/:userBrokerId')
  // public async deleteBroker(
  //   @Param('clietnId') clietnId: string,
  //   @Param('userBrokerId') userBrokerId: string,
  // ) {
  //   return await this.userInBrokerService.deleteBroker(clietnId, userBrokerId);
  // }

  @Roles('CLIENT')
  @Post(':brokerId/:clientId')
  public async addClient(
    @Param('brokerId') brokerId: string,
    @Param('clientId') clientId: string,
  ) {
    return await this.userInBrokerService.addClient(brokerId, clientId);
  }
}
