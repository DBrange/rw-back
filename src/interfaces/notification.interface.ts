import { NotificationResponse } from "src/containers/notification/types/response.enum";

export interface INotification {
  title: string;
  message: string;
  isRead: boolean;
  response: NotificationResponse;
}