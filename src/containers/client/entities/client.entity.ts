import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BrokerClientRelation } from 'src/containers/broker-client-relations/entities/broker-client-relation.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @OneToMany(() => BrokerClientRelation, (relation) => relation.client)
  brokerClientRelations: BrokerClientRelation[];
}