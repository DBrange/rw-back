import { Injectable } from '@nestjs/common';
import { NotificationDTO } from 'src/containers/notification/dto/notification.dto';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';
import { NotificationService } from '../../notification/services/notification.service';
import { BrokerEntity } from 'src/containers/broker/entities/broker.entity';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserInBrokerService {
  constructor(
    private readonly userService: UserService,
    private readonly userBrokerService: UserBrokerService,
    private readonly notificationService: NotificationService,
  ) {}

  public async sendEmail(
    clientName: string,
    recipients: string[],
  ): Promise<void> {
    try {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const configService = new ConfigService();
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: `${configService.get('EMAIL_USER')}`,
          pass: `${configService.get('EMAIL_PASSWORD')}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
        requireTLS: true,
      });

      const mailOptions = {
        from: `<${configService.get('EMAIL_USER')}>`,
        to: recipients.join(', '),
        subject: 'Nuevo cliente',
        text: `El cliente ${clientName} ha aceptado su solicitud`,
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  private async notificationClientAdded(
    clientId: string,
    brokerId: string,
    brokerName: string,
    clientName: string,
  ) {
    const bodyNotificationClient: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha añadido un nuevo broker - ${brokerName}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: clientId,
    };

    const bodyNotificationBroker: NotificationDTO = {
      title: 'Inspeccion',
      message: `Se ha añadido un nuevo cliente - ${clientName}`,
      withOptions: false,
      additional: null,
      response: null,
      sender: null,
      receiver: brokerId,
    };

    await this.notificationService.createNotification(bodyNotificationClient);
    await this.notificationService.createNotification(bodyNotificationBroker);
  }

  public async addClient(userBrokerId: string, clientId: string) {
    try {
      const client = await this.userService.getUserByIdForOnlyBroker(clientId);
      const broker = await this.userService.getUserByUserBrokerId(userBrokerId);

      await this.userService.updateOnlyBroker(clientId, {
        ...client,
        broker: [userBrokerId],
      });

      const brokers = await this.userService.getUserForBrokers(clientId);

      const brokerName = broker.legalUser
        ? broker.legalUser.companyName
        : `${broker.personalUser.name} ${broker.personalUser.lastName}`;

      const clientName = client.legalUser
        ? client.legalUser.companyName
        : `${client.personalUser.name} ${client.personalUser.lastName}`;

      await this.notificationClientAdded(
        clientId,
        broker.id,
        brokerName,
        clientName,
      );

      await this.sendEmail(clientName, [broker.email]);

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

  // public async deleteBroker(clientId: string, userBrokerId: string) {
  //   const user = await this.userService.userForDeleteBroker(clientId)

  //   if (user) {
  //     const a = (user.broker as unknown as UserBrokerEntity[]).filter(el => el.id !== userBrokerId)

  //     await this.
  //   }
  // }
}
