import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { BrokerDTO, UpdateBrokerDTO } from '../dto/broker.dto';
import { BrokerEntity } from '../entities/broker.entity';

@Injectable()
export class BrokerService {
  constructor(
    @InjectRepository(BrokerEntity)
    private readonly brokerRepository: Repository<BrokerEntity>,
  ) {}

  public async createBroker(body: BrokerDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.brokerRepository.save(body);
      // return { message: 'The broker has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getBrokers(): Promise<BrokerEntity[]> {
    try {
      const users: BrokerEntity[] = await this.brokerRepository.find();

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getBrokerById(id: string): Promise<BrokerEntity> {
    try {
      const user = await this.brokerRepository.findOneBy({ id });

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

  public async updateBroker(
    id: string,
    body: UpdateBrokerDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.brokerRepository.update(id, body);
      if (updatedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No broker were updated',
        });
      }

      return updatedUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteBroker(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.brokerRepository.delete(id);

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete broker',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
