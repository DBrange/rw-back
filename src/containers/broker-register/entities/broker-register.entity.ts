import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { User } from '../../users/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.brokerRegisters)
  user: User;

  @ManyToOne(() => Broker, (broker) => broker.brokerRegisters)
  broker: Broker;
}
