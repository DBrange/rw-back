import { IsString, IsNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  nombre: string;

  @IsNumber()
  userId: number;
}