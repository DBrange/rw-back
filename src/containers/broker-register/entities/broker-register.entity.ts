import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Broker } from 'src/containers/broker/entities/broker.entity';

@Entity('broker_registers')
export class BrokerRegister {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razonSocial: string;

  @Column()
  matricula: string;

  @Column()
  tarjeta: string;

  @ManyToOne(() => UserEntity, (user) => user.brokerRegisters)
  user: UserEntity;

  @ManyToOne(() => Broker, (broker) => broker.brokerRegisters)
  broker: Broker;
}
