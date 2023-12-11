import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { NotificationResponse } from "../types/response.enum";

export class NotificationDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  withOptions: boolean;
  
  @IsOptional()
  @IsString()
  additional: string;

  @IsOptional()
  @IsEnum(NotificationResponse)
  response: NotificationResponse;

  @IsOptional()
  @IsUUID()
  sender: string;

  @IsNotEmpty()
  @IsUUID()
  receiver: string;
}

export class UpdateNotificationDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsBoolean()
  withOptions: boolean;

  @IsOptional()
  @IsString()
  additional: string;

  @IsOptional()
  @IsBoolean()
  isRead: boolean;

  @IsOptional()
  @IsUUID()
  sender: string;

  @IsOptional()
  @IsEnum(NotificationResponse)
  response: NotificationResponse;
}