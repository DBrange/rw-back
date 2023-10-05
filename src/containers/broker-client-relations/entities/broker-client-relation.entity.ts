import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Broker } from "../../broker/entities/broker.entity";
import { Client } from "../../client/entities/client.entity";


@Entity('broker_client_relations')
export class BrokerClientRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Broker, (broker) => broker.brokerClientRelations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'broker_id' })
  broker: Broker;

  @ManyToOne(() => Client, (client) => client.brokerClientRelations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;
}