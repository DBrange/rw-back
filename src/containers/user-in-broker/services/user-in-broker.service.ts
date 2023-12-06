import { Injectable } from '@nestjs/common';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserService } from 'src/containers/user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UserInBrokerService {
  constructor(
    private readonly userService: UserService,
    private readonly userBrokerService: UserBrokerService,
  ) {}

  public async addClient(userBrokerId: string, clientId: string) {
    try {
      // const currentBroker = await this.userBrokerService.getUserBrokerById(
      //   userBrokerId,
      // );

      // if (!currentBroker) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No broker found',
      //   });
      // }
      const client = (await this.userService.getUsers()).find(client => client.id === clientId);
      
      // if (!client) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No client found',
      //   });
      // }
      console.log(client)

      await this.userService.updateUser(clientId, {
        ...client,
        broker: userBrokerId,
      });
      return { message: 'A client has been added to the broker successfully' };
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
