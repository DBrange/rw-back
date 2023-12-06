import { IsNotEmpty, IsUUID } from "class-validator";
import { UserEntity } from "src/containers/user/entities/user.entity";

export class BrokerDTO {
  @IsNotEmpty()
  @IsUUID()
  user: string;
}

export class UpdateBrokerDTO {
  @IsNotEmpty()
  @IsUUID()
  user: string;
}