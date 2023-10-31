import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import * as bcrypt from 'bcrypt';

import { UserUserBrokerDTO } from './dto/allUser.dto';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { LegalUsersDTO } from '../legal-users/dto/legalUsers.dto';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { AssetEntity } from '../asset/entities/asset.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userBrokerService: UserBrokerService,
    private readonly legalUserService: LegalUsersService,
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createUserInLogin(body: UserUserBrokerDTO) {
    try {
      let newBroker: UserBrokerEntity;

      if (body.userBrokerDTO) {
        newBroker = await this.userBrokerService.createUserBroker(
          body.userBrokerDTO,
        );
      }

      if (body.userDTO) {
        // body.userDTO.password = await bcrypt.hash(body.userDTO.password, +process.env.HASH_SALT);
        await this.userRepository.save({ ...body.userDTO, broker: newBroker });
      } else if (body.legalUserDTO) {
        // body.legalUserDTO.password = await bcrypt.hash(body.legalUserDTO.password, +process.env.HASH_SALT);
        await this.legalUserService.createLegalUsers({
          ...body.legalUserDTO,
          broker: newBroker,
        });
      }

      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return { message: 'El usuario a sido creado con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAllUsers(): Promise<(UserEntity | LegalUsers)[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      const legalUsers: LegalUsers[] =
        await this.legalUserService.getAllLegalUsers();

      const allUsers = [...users, ...legalUsers];
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return allUsers;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsersById(id: string): Promise<UserEntity> {
    try {
      const userr = await this.userRepository.findOneBy({ id });
      const user =
        userr.role === 'CLIENT'
          ? await this.userRepository
              .createQueryBuilder('user')
              .where({ id })
              // .select([
              //   'user',
              //   'asset.id',
              //   'userBroker.id',
              //   'userBroker.bussinesName',
              //   'userBroker.enrollment',
              // ])
              // // .leftJoinAndSelect('user.broker', 'userBroker')
              .leftJoinAndSelect('user.userBroker', 'users')
              // .leftJoin('users.broker', 'userBroker')
              .leftJoinAndSelect('user.asset', 'asset')
              // .leftJoinAndSelect('asset.users', 'users')
              .leftJoinAndSelect('asset.legalUsers', 'legalUsers')
              .leftJoinAndSelect('asset.vehicle', 'vehicle')
              .leftJoinAndSelect('asset.electronics', 'electronics')
              .getOne()
          : await this.userRepository
              .createQueryBuilder('user')
              .where({ id })
              .select(['user', 'asset.id', 'userBroker.id'])
              .leftJoinAndSelect('user.broker', 'userBroker')
              // .leftJoinAndSelect('user.userBroker', 'users')
              // .leftJoinAndSelect('users.broker', 'userBroker')
              .leftJoinAndSelect('user.asset', 'asset')
              // .leftJoinAndSelect('asset.users', 'users')
              .leftJoinAndSelect('asset.legalUsers', 'legalUsers')
              .leftJoinAndSelect('asset.vehicle', 'vehicle')
              .leftJoinAndSelect('asset.electronics', 'electronics')
              .getOne();

      // const user = await this.userRepository
      //   .createQueryBuilder('user')
      //   .where({ id })
      //   .select(['user', 'asset.id', 'userBroker.id'])
      //   .leftJoinAndSelect('user.broker', 'userBroker')
      //   .leftJoin('user.userBroker', 'userBroker.id')
      //   .leftJoin('user.asset', 'asset')
      //   .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAssetOfUser(id: string): Promise<AssetEntity[]> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.asset', 'asset')
        .leftJoinAndSelect('asset.vehicle', 'vehicle')
        .leftJoinAndSelect('asset.electronics', 'electronics')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return user.asset;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  // public async getSinistersOfUser(id: string) {

  // }

  //* parte de auth (autienticacion)
  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.userRepository.update(id, body);
      if (updatedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users were updated',
        });
      }
      return updatedUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | void> {
    try {
      const deleteUser = await this.userRepository.delete(id);
      if (deleteUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User ${id} cannot be found or deleted`,
        });
      }
      return deleteUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async addClient(client: string, broker: string) {
    try {
      const currentBroker = await this.userBrokerService.getUserBrokerById(
        broker,
      );

      if (!currentBroker) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      const clientToAdd = await this.userRepository.findOneBy({ id: client });

      if (!clientToAdd) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      await this.updateUser(client, {
        ...clientToAdd,
        userBroker: currentBroker,
      });

      return { message: 'El cliente a sido agregado con exito' };
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
  // public async addClient(client: string, broker: string) {
  //   try {
  //     // const currentBroker = await this.userBrokerService.getUserBrokerById(
  //     //   broker,
  //     // );

  //     // if (!currentBroker) {
  //     //   throw new ErrorManager({
  //     //     type: 'BAD_REQUEST',
  //     //     message: 'No users found',
  //     //   });
  //     // }

  //     const clientToAdd = await this.userRepository.findOneBy({ id: client });
  //     const userBrokerr = await this.userRepository
  //       .createQueryBuilder('user')
  //       .where({ id: broker })
  //       .leftJoinAndSelect('user.broker', 'broker')
  //       .getOne();

  //     const currentBroker = await this.userBrokerService.getUserBrokerById(
  //       userBrokerr.broker.id,
  //     );
  //     console.log(userBrokerr.broker.id);

  //     if (!clientToAdd) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No users found',
  //       });
  //     }

  //     await this.updateUser(client, {
  //       ...clientToAdd,
  //       userBroker: userBrokerr,
  //     });

  //     // currentBroker.clients.push(clientToAdd);

  //     // await this.userBrokerService.updateUserBroker(currentBroker.id, {
  //     //   ...currentBroker
  //     // });

  //     return { message: 'El cliente a sido agregado con exito' };
  //   } catch (error) {
  //     throw new ErrorManager.createSignaturError(error.message);
  //   }
  // }
}
