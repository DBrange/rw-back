import { UserEntity } from "src/containers/user/entities/user.entity";
import { Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity('brokers')
export class BrokerEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: string;
}