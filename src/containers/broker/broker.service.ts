import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broker } from './entities/broker.entity';
import { BrokerDTO } from './dto/broker.dto';

@Injectable()
export class BrokerService {
  constructor(
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
  ) {}

  public async create(brokerDTO: BrokerDTO): Promise<Broker> {
    try {
      const broker = this.brokerRepository.create(brokerDTO);
      return this.brokerRepository.save(broker);
    } catch (error) {
      throw new Error(`Error al crear un broker: ${error.message}`);
    }
  }

  public async findAll(): Promise<Broker[]> {
    try {
      return this.brokerRepository.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los brokers: ${error.message}`);
    }
  }
}
