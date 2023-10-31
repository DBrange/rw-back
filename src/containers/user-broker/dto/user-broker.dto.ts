import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { LegalUsers } from "src/containers/legal-users/entities/legalUsers.entity";
import { UserEntity } from "src/containers/users/entities/user.entity";
import { IUserBroker } from "src/interfaces/broker-user.interface";

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

  // @IsOptional()
  // @IsUUID()
  // user: UserEntity | LegalUsers;
}