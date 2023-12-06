import { UserEntity } from "src/containers/user/entities/user.entity";
import { Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: string;
}