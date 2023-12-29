import { Injectable } from '@nestjs/common';
import { UserBrokerEntity } from '../entities/user-broker.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserBrokerDTO, UpdateUserBrokerDTO } from '../dto/user-broker.dto';

@Injectable()
export class UserBrokerService {
  constructor(
    @InjectRepository(UserBrokerEntity)
    private readonly userBrokerRepository: Repository<UserBrokerEntity>,
  ) {}

  public async createUserBroker(body: UserBrokerDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.userBrokerRepository.save(body);
      // return { message: 'The user has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsersBroker(): Promise<UserBrokerEntity[]> {
    try {
      const users: UserBrokerEntity[] = await this.userBrokerRepository.find();

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUserBrokerById(id: string): Promise<UserBrokerEntity> {
    try {
      const user = await this.userBrokerRepository
        .createQueryBuilder('users_broker')
        .where({ id })
        .leftJoinAndSelect('users_broker.clients', 'clients')
        .leftJoinAndSelect('clients.legalUser', 'legalUser')
        .leftJoinAndSelect('clients.personalUser', 'personalUser')
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

  public async updateUserBroker(
    id: string,
    body: UpdateUserBrokerDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.userBrokerRepository.update(id, body);
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

  public async deleteUserBroker(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userBrokerRepository.delete(id);

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

  public async verifyEnrollment(enrollment: string | null) {
    try {
      const verifyEnrollment = await this.userBrokerRepository
        .createQueryBuilder('users_broker')
        .where({ enrollment })
        .getOne();

      if (verifyEnrollment) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // public async brokerOfClient(id: string): Promise<UserBrokerEntity> {
  //   try {
  //     const user = await this.userBrokerRepository
  //       .createQueryBuilder('users_broker')
  //       .where({  })
  //       .leftJoinAndSelect('users_broker.clients', 'clients')
  //       .leftJoinAndSelect('clients.legalUser', 'legalUser')
  //       .leftJoinAndSelect('clients.personalUser', 'personalUser')
  //       .getOne();

  //     if (!user) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No users found',
  //       });
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new ErrorManager.createSignaturError(error.message);
  //   }
  // }
}
