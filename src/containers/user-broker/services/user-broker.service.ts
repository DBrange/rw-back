import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBrokerEntity } from '../entities/user-broker.entity';
import { Repository } from 'typeorm';
import { UserBrokerDTO } from '../dto/user-broker.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UserBrokerService {
  constructor(
    @InjectRepository(UserBrokerEntity)
    private readonly userBrokerRepository: Repository<UserBrokerEntity>,
  ) { }
  
  public async createUserBroker(body: UserBrokerDTO) {
    try {
      await this.userBrokerRepository.save(body);
      return { message: 'El broker a sido creado con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getusersBroker() {
    try {
      const usersBroker: UserBrokerEntity[] = await this.userBrokerRepository.find();

      if (usersBroker.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      return usersBroker;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
}
