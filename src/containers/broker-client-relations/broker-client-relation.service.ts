import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrokerClientRelation } from './entities/broker-client-relation.entity';
import { Repository } from 'typeorm';
import { CreateBrokerClientRelationDto } from './dto/broker-client-relation.dto';
import { Broker } from '../broker/entities/broker.entity';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class BrokerClientRelationService {
  constructor(
    @InjectRepository(BrokerClientRelation)
    private readonly brokerClientRelationRepository: Repository<BrokerClientRelation>,
  ) {}

  public async create(
    createRelationDto: CreateBrokerClientRelationDto,
  ): Promise<BrokerClientRelation> {
    try {
      const { brokerId, clientId } = createRelationDto;
      const relation = new BrokerClientRelation();

      relation.broker = { id: brokerId } as Broker;
      relation.client = { id: clientId } as Client;
      return this.brokerClientRelationRepository.save(relation);
    } catch (error) {
      throw new Error(
        `Error al crear la relación broker-cliente: ${error.message}`,
      );
    }
  }

  public async findAll(): Promise<BrokerClientRelation[]> {
    try {
      return this.brokerClientRelationRepository.find();
    } catch (error) {
      throw new Error(
        `Error al obtener todas las relaciones broker-cliente: ${error.message}`,
      );
    }
  }
}
