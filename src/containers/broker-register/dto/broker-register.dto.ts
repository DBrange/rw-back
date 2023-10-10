import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateBrokerRegisterDto {
  @IsString()
  razonSocial: string;

  @IsString()
  matricula: string;

  @IsString()
  tarjeta: string;

  @IsNumber()
  userId: number;

  @IsArray()
  clientIds: number[];
}
