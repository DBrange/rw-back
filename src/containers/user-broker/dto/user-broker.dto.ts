import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { IUserBroker } from 'src/interfaces/broker-user.interface';

export class UserBrokerDTO implements IUserBroker {
  @IsNotEmpty()
  @IsString()
  bussinesName: string;

  @IsNotEmpty()
  @IsString()
  enrollment: string;

  @IsOptional()
  @IsString()
  card: string;
}

export class UpdateUserBrokerDTO {
  @IsOptional()
  @IsString()
  bussinesName: string;

  @IsOptional()
  @IsString()
  enrollment: string;

  @IsOptional()
  @IsString()
  card: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  clients: string[];
}

