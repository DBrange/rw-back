import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientDTO } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async create(createClientDTO: ClientDTO){
    try {
      this.clientRepository.create(createClientDTO);
      return { message: 'El cliente se ha creado correctamente' };
    } catch (error) {
      throw new Error(`Error al crear el cliente: ${error.message}`);
    }
  }

  public async findAll(): Promise<ClientEntity[]> {
    try {
      return this.clientRepository.find();
    } catch (error) {
      throw new Error(
        `Error al obtener la lista de clientes: ${error.message}`,
      );
    }
  }
}
