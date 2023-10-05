import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GENDER } from 'src/constants/enums';
import { IUser } from 'src/interfaces/users.interface';
import { ROLES } from '../../../constants/roles';
import { Asset } from 'src/containers/asset/entities/asset.entity';
import { BrokerRegister } from 'src/interfaces/broker-register.interface';
import { Client } from 'src/interfaces/client.interface';

export class UserDTO implements IUser {
  clients: Client[];
  brokerRegisters: BrokerRegister[];
  asset: Asset[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDTO implements IUser {
  clients: Client[];
  brokerRegisters: BrokerRegister[];
  asset: Asset[];

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsOptional()
  @IsString()
  dni: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}
