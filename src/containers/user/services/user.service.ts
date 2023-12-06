import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UserDTO, UpdateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(body: UserDTO) {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);

      return await this.userRepository.save(body);
      // return { message: 'The user has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUserById(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.brokerAssets', 'brokerAssets')
        // .leftJoinAndSelect('brokerAssets.vehicle', 'vehicle')
        // .leftJoinAndSelect('brokerAssets.electronic', 'electronic')
        // .leftJoinAndSelect('brokerAssets.sinisters', 'sinisters')

        .leftJoinAndSelect('users.assets', 'assets')
        .leftJoinAndSelect('assets.vehicle', 'vehicle')
        .leftJoinAndSelect('assets.electronic', 'electronic')
        .leftJoinAndSelect('assets.sinisters', 'sinisters')
        .leftJoinAndSelect('assets.client', 'client')
        .leftJoinAndSelect('client.personalUser', 'clientPersonalUser')
        .leftJoinAndSelect('client.legalUser', 'clientLegalUser')
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .leftJoinAndSelect('users.broker', 'brokers')
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoinAndSelect('userBroker.clients', 'clients')
        .leftJoinAndSelect('clients.personalUser', 'clientsPersonalUser')
        .leftJoinAndSelect('clients.legalUser', 'clientsLegalUsers')
        .getOne();

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
  
  public async getUserByIdForProfile(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .leftJoinAndSelect('users.broker', 'brokers')
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoinAndSelect('users.receivedNotifications', 'notifications')
        .getOne();

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

  public async updateUser(
    id: string,
    body: UpdateUserDTO,
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

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete user',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async verifyEmail(email: string | undefined) {
    try {
      const emailOrDni = await this.userRepository
        .createQueryBuilder('users')
        .where({ email })
        .getOne();

      if (emailOrDni) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .addSelect('users.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInspectionsOfClient(id: string) {
    const client = await this.userRepository
      .createQueryBuilder('users')
      .where({ id })
      .leftJoinAndSelect('users.assets', 'assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .getOne();

    if (!client) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No users found',
      });
    }

    return client.assets;
  }
}
