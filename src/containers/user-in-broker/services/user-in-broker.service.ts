import { Injectable } from '@nestjs/common';
import { NotificationDTO } from 'src/containers/notification/dto/notification.dto';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';
import { NotificationService } from '../../notification/services/notification.service';
import { BrokerEntity } from 'src/containers/broker/entities/broker.entity';

@Injectable()
export class UserInBrokerService {
  constructor(
    private readonly userService: UserService,
    private readonly userBrokerService: UserBrokerService,
    private readonly notificationService: NotificationService,
  ) {}

  public async addClient(userBrokerId: string, clientId: string) {
    try {
      const client = await this.userService.getUserByIdForOnlyBroker(clientId);
      // const filterRepeatedId: string[] = (
      //   client.broker as unknown as BrokerEntity[]
      // ).map((broker) => {
      //   if (broker.id !== userBrokerId) {
      //     return broker.id;
      //   }
      //   return 
      // });
      // console.log({
      //   ...client,
      //   broker: [...filterRepeatedId, userBrokerId],
      // });

      await this.userService.updateOnlyBroker(clientId, {
        ...client,
        broker: [userBrokerId],
      });

      const brokers = await this.userService.getUserForBrokers(clientId)

      // const userBroker = await this.userBrokerService.getUserBrokerById(
      //   userBrokerId,
      // );

      // const filterRepeatedIdUserBroker = userBroker.clients.filter(
      //   (broker) => broker !== userBrokerId,
      //   );

      // await this.userBrokerService.updateUserBroker(userBrokerId, {
      //   ...userBroker,
      //   clients: [...filterRepeatedIdUserBroker, clientId],
      // });

      return brokers;
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
      withOptions: false,
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
