import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { AUTHORIZATION, ROLES } from '../../../constants/roles';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

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
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsUUID()
  broker: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

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
  @IsDate()
  lastRecord: Date;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;

  @IsOptional()
  @IsUUID()
  userBroker: string;

  @IsOptional()
  @IsEnum(AUTHORIZATION)
  authorization: AUTHORIZATION;

  @IsOptional()
  @IsUUID()
  broker: string;
}

// export class UserToAssetDTO {

//   @IsNotEmpty()
//   @IsUUID()
//   user: UserEntity;

//   @IsOptional()
//   @IsUUID()
//   asset: AssetEntity[];

// @IsNotEmpty()
// @IsEnum(ACCESS_LEVEL)
// accessLevel: ACCESS_LEVEL;
//}
