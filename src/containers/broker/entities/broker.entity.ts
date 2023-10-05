import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BrokerClientRelation } from 'src/containers/broker-client-relations/entities/broker-client-relation.entity';
import { BrokerRegister } from 'src/containers/broker-register/entities/broker-register.entity';

@Entity('brokers')
export class Broker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => BrokerRegister, (register) => register.broker)
  brokerRegisters: BrokerRegister[];

  @OneToMany(() => BrokerClientRelation, (relation) => relation.broker)
  brokerClientRelations: BrokerClientRelation[];
}