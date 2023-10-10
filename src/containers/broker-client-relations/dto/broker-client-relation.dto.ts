import { IsNumber } from 'class-validator';

export class CreateBrokerClientRelationDto {
  @IsNumber()
  brokerId: number;

  @IsNumber()
  clientId: number;
}