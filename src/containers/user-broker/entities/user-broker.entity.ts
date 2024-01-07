import { UserEntity } from "src/containers/user/entities/user.entity";
import { IUserBroker } from "src/interfaces/broker-user.interface";
import { Entity, Column, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'users_broker' })
export class UserBrokerEntity extends BaseEntity implements IUserBroker {
  @Column()
  bussinesName: string;

  @Column()
  enrollment: string;

  @Column()
  card: string;

  @ManyToMany(() => UserEntity, (user) => user.broker, {
    onDelete: 'CASCADE', // <-- y Aquí
  })
  @JoinTable()
  clients: string[];
}


