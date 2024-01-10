import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import {
  NotificationDTO,
  UpdateNotificationDTO,
} from '../dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}

  public async createNotification(body: NotificationDTO) {
    try {
      return await this.notificationRepository.save(body);
      // return { message: 'The notification has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getNotifications(): Promise<NotificationEntity[]> {
    try {
      const notifications: NotificationEntity[] =
        await this.notificationRepository.find();

      return notifications;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getNotificationById(id: string) {
    try {
      const notification = await this.notificationRepository
        .createQueryBuilder('notifications')
        .where({ id })
        .leftJoinAndSelect('notifications.sender', 'sender')
        .leftJoinAndSelect('notifications.receiver', 'receiver')
        .getOne();

      if (!notification) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No notifications found',
        });
      }
      return notification;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateNotification(
    id: string,
    body: UpdateNotificationDTO,
  ): Promise<UpdateResult> {
    try {
      console.log(body)
      const updatedNotification = await this.notificationRepository.update(
        id,
        body,
      );
      if (updatedNotification.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No notifications were updated',
        });
      }

      return updatedNotification;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteNotification(id: string): Promise<DeleteResult> {
    try {
      const notification: DeleteResult =
        await this.notificationRepository.delete(id);

      if (!notification) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete notification',
        });
      }

      return notification;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }


}
