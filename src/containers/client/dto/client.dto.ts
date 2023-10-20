import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserEntity } from 'src/containers/users/entities/user.entity';

export class ClientDTO {
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;
}