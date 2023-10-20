import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { GENDER } from 'src/constants/enums';
import { IUser } from 'src/interfaces/users.interface';
<<<<<<< HEAD
import { ROLES } from '../../../constants/roles';
=======
import {  ROLES } from '../../../constants/roles';
import { AssetEntity } from 'src/containers/asset/entities/asset.entity';
import { BrokerRegister } from 'src/interfaces/broker-register.interface';
import { Client } from 'src/interfaces/client.interface';
//import { UserEntity } from '../entities/user.entity';
>>>>>>> 6e5a738fea9708e8e6308d9700ae7db071f9287f

export class UserDTO implements IUser {
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

export class UserUpdateDTO {
  // clients: Client[];
  // brokerRegisters: BrokerRegister[]

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
