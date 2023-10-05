import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  public async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const client = this.clientRepository.create(createClientDto);
      return this.clientRepository.save(client);
    } catch (error) {
      throw new Error(`Error al crear el cliente: ${error.message}`);
    }
  }

  public async findAll(): Promise<Client[]> {
    try {
      return this.clientRepository.find();
    } catch (error) {
      throw new Error(
        `Error al obtener la lista de clientes: ${error.message}`,
      );
    }
  }
}
