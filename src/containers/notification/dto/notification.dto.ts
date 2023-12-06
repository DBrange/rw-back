import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { NotificationResponse } from "../types/response.enum";

export class NotificationDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  isRead: boolean;

  @IsNotEmpty()
  @IsEnum(NotificationResponse)
  response: NotificationResponse;
}

export class UpdateNotificationDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsUUID()
  sender: string;

  @IsOptional()
  @IsEnum(NotificationResponse)
  response: NotificationResponse;
}