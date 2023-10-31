import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ROLES } from 'src/constants/roles';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';

export class LegalUsersDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  cuit: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsUUID()
  broker: UserBrokerEntity;
}

export class LegalUsersUpdateDTO {
  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  cuit: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsUUID()
  broker: UserBrokerEntity;

  @IsOptional()
  @IsUUID()
  userBroker: UserBrokerEntity;
}
