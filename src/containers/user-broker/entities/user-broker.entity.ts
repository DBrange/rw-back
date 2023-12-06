import { UserEntity } from "src/containers/user/entities/user.entity";
import { IUserBroker } from "src/interfaces/broker-user.interface";
import { Entity, Column, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'users_broker' })
export class UserBrokerEntity extends BaseEntity implements IUserBroker {
  @Column()
  bussinesName: string;

  @Column({ unique: true })
  enrollment: string;

  @Column()
  card: string;

  @OneToMany(() => UserEntity, (user) => user.broker)
  @JoinColumn()
  clients: string[];
}


