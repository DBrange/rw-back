import { IsString, IsNumber } from 'class-validator';

export class CreateBrokerDto {
  @IsString()
  nombre: string;

  @IsNumber()
  userId: number;
}