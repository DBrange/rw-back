import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationDTO, UpdateNotificationDTO } from '../dto/notification.dto';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('')
  public async createNotification(@Body() body: NotificationDTO) {
    return await this.notificationService.createNotification(body);
  }

  @Get('')
  public async getNotifications() {
    return await this.notificationService.getNotifications();
  }

  @Get(':notificationId')
  public async getNotificationById(@Param('notificationId') id: string) {
    return await this.notificationService.getNotificationById(id);
  }

  @Put(':notificationId')
  public async updateNotification(
    @Param('notificationId') id: string,
    @Body() body: UpdateNotificationDTO,
  ) {
    return await this.notificationService.updateNotification(id, body);
  }

  @Delete(':notificationId')
  public async deleteNotification(@Param('notificationId') id: string) {
    return await this.notificationService.deleteNotification(id);
  }
}
