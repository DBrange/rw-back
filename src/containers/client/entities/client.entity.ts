import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BrokerClientRelation } from 'src/containers/broker-client-relations/entities/broker-client-relation.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => UserEntity, (user) => user.clients)
  user: UserEntity;

  @OneToMany(() => BrokerClientRelation, (relation) => relation.client)
  brokerClientRelations: BrokerClientRelation[];
}