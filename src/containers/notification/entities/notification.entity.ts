import { UserEntity } from "src/containers/user/entities/user.entity";
import { INotification } from "src/interfaces/notification.interface";
import { Entity, Column, ManyToOne } from "typeorm";
import { NotificationResponse } from "../types/response.enum";
import { BaseEntity } from "src/config/base.entity";

@Entity({ name: 'notifications' })
export class NotificationEntity extends BaseEntity implements INotification {
  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  withOptions: boolean;

  @Column({nullable: true})
  additional: string

  @ManyToOne(() => UserEntity, (user) => user.sentNotifications)
  sender: string;

  @ManyToOne(() => UserEntity, (user) => user.receivedNotifications)
  receiver: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ type: 'enum', enum: NotificationResponse, nullable: true })
  response: NotificationResponse;
}
