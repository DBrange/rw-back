import { Broker } from "./broker.interface";
import { Client } from "./client.interface";

export interface BrokerClientRelations {
    id: number;
    broker: Broker;
    client: Client;
}
