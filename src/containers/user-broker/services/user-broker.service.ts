import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserBrokerEntity,
  UserBrokerUpdateDTO,
} from '../entities/user-broker.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserBrokerDTO } from '../dto/user-broker.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersService } from 'src/containers/users/users.service';
import { UserEntity } from 'src/containers/users/entities/user.entity';
import { LegalUsersService } from 'src/containers/legal-users/legal-users.service';

@Injectable()
export class UserBrokerService {
  constructor(
    @InjectRepository(UserBrokerEntity)
    private readonly userBrokerRepository: Repository<UserBrokerEntity>,
  ) // private readonly userService: UsersService,
  // private readonly leglaUserService: LegalUsersService,
  {}

  public async createUserBroker(body: UserBrokerDTO) {
    try {
      return await this.userBrokerRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getusersBroker() {
    try {
      const usersBroker: UserBrokerEntity[] =
        await this.userBrokerRepository.find();

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

  public async getUserBrokerById(id: string) {
    try {
      const userBroker: UserBrokerEntity = await this.userBrokerRepository
        .createQueryBuilder('userBroker')
        .where({ id })
        .leftJoinAndSelect('userBroker.clients', 'clients')
        .leftJoinAndSelect('userBroker.legalClients', 'legalClients')
        // .leftJoinAndSelect('userBroker.clients', 'users')
        .getOne();

      if (!userBroker) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      return userBroker;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  // public async addClient(client: string, broker: string) {
  //   try {
  //     const currentBroker = this.userBrokerRepository.findOneBy({ id: broker });

  //     if (!currentBroker) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No users found',
  //       });
  //     }

  //     const clientToAdd = await this.userService.getUsersById(client);

  //     this.updateToAddClients((await currentBroker).id, {
  //       clients: [...(await currentBroker).clients, clientToAdd.id],
  //     });
  //   } catch (error) {
  //     throw new ErrorManager.createSignaturError(error.message);
  //   }
  // }

  public async updateUserBroker(
    id: string,
    body: UserBrokerUpdateDTO,
  ): Promise<UpdateResult> {
    const userBroker: UpdateResult = await this.userBrokerRepository.update(
      id,
      body,
    );

    if (!userBroker.affected) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Failed to update user',
      });
    }

    return userBroker;
  }
}
