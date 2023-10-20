import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BaseEntity } from 'src/config/base.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}