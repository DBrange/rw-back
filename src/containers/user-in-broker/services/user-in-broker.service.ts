import { Injectable } from '@nestjs/common';
import { NotificationDTO } from 'src/containers/notification/dto/notification.dto';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';
import { NotificationService } from '../../notification/services/notification.service';

@Injectable()
export class UserInBrokerService {
  constructor(
    private readonly userService: UserService,
    private readonly userBrokerService: UserBrokerService,
    private readonly notificationService: NotificationService,
  ) {}

  public async addClient(userBrokerId: string, clientId: string) {
    try {
      const client = (await this.userService.getUsers()).find(
        (client) => client.id === clientId,
      );

      await this.userService.updateUser(clientId, {
        ...client,
        broker: userBrokerId,
      });

      return { message: 'A client has been added to the broker successfully' };
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async notificationForAddClient(
    brokerId: string,
    clientId: string,
    userBrokerId: string,
    name: string,
    lastname: string | undefined,
    clientName: string,
    clientLastname: string | undefined,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Solicitud',
      message: `${name} ${
        lastname && lastname
      } ha solicitado ejercer como su broker`,
      withOptions: true,
      additional: userBrokerId,
      response: null,
      sender: brokerId,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Solicitud',
      message: `La solicitud de broker para ${clientName} ${
        clientLastname && clientLastname
      } ha sido enviada`,
      withOptions: true,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);

    return { message: 'the notification successfully' };
  }
}
