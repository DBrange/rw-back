import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { UserEntity } from "src/containers/user/entities/user.entity";

export class ClientDTO {
  @IsNotEmpty()
  @IsUUID()
  user: string;
}

export class UpdateClientDTO {
  @IsOptional()
  @IsUUID()
  user: string;
}