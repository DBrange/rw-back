import { BaseEntity } from 'src/config/base.entity';
import { UserEntity } from 'src/containers/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('brokers')
export class Broker extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}