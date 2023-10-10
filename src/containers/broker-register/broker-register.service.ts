import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrokerRegister } from './entities/broker-register.entity';
import { Repository } from 'typeorm';
import { CreateBrokerRegisterDto } from './dto/broker-register.dto';

@Injectable()
export class BrokerRegisterService {
  constructor(
    @InjectRepository(BrokerRegister)
    private readonly brokerRegisterRepository: Repository<BrokerRegister>,
  ) {}

  public async create(
    createBrokerRegisterDto: CreateBrokerRegisterDto,
  ): Promise<BrokerRegister> {
    try {
      const brokerRegister = this.brokerRegisterRepository.create(
        createBrokerRegisterDto,
      );
      return this.brokerRegisterRepository.save(brokerRegister);
    } catch (error) {
      throw new Error(`Error al crear un registro de broker: ${error.message}`);
    }
  }

  public async findAll(): Promise<BrokerRegister[]> {
    try {
      return this.brokerRegisterRepository.find();
    } catch (error) {
      throw new Error(
        `Error al obtener todos los registros de broker: ${error.message}`,
      );
    }
  }
}
