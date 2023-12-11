import { IsNotEmpty, IsString } from 'class-validator';

export class UserInBrokerDTO {
  @IsNotEmpty()
  @IsString()
  brokerId: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  userBrokerId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string 

  @IsNotEmpty()
  @IsString()
  clientName: string;

  @IsNotEmpty()
  @IsString()
  clientLastname: string
}
