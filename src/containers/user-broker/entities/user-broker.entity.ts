import { BaseEntity } from 'src/config/base.entity';
import { UserEntity } from 'src/containers/users/entities/user.entity';
import { IUserBroker } from 'src/interfaces/broker-user.interface';
import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user_broker' })
export class UserBrokerEntity extends BaseEntity implements IUserBroker {
  @Column()
  bussinesName: string;

  @Column({ unique: true })
  enrollment: string;

  @Column()
  card: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.userBroker)
  @JoinColumn()
  clients: UserEntity[];
}
