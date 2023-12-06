import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjuredDTO, UpdateInjuredDTO } from '../dto/injured.dto';
import { InjuredEntity } from '../entities/injured.entity';

@Injectable()
export class InjuredService {
  constructor(
    @InjectRepository(InjuredEntity)
    private readonly injuredRepository: Repository<InjuredEntity>,
  ) {}

  public async createInjured(body: InjuredDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.injuredRepository.save(body);
      // return { message: 'The injured has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInjureds(): Promise<InjuredEntity[]> {
    try {
      const injureds: InjuredEntity[] = await this.injuredRepository.find();

      return injureds;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInjuredById(id: string) {
    try {
      const injured = await this.injuredRepository
        .createQueryBuilder('injureds')
        .where({ id })
        .leftJoinAndSelect('injureds.injuredsInfo', 'injuredsInfo')
        .leftJoinAndSelect('injureds.sinister', 'sinister')

        .getOne();

      if (!injured) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No injureds found',
        });
      }
      return injured;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateInjured(
    id: string,
    body: UpdateInjuredDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedInjured = await this.injuredRepository.update(id, body);
      if (updatedInjured.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No injureds were updated',
        });
      }

      return updatedInjured;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteInjured(id: string): Promise<DeleteResult> {
    try {
      const injured: DeleteResult = await this.injuredRepository.delete(id);

      if (!injured) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete injured',
        });
      }

      return injured;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
