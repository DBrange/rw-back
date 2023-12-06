import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TheftDTO, UpdateTheftDTO } from '../dto/theft.dto';
import { TheftEntity } from '../entities/theft.entity';

@Injectable()
export class TheftService {
  constructor(
    @InjectRepository(TheftEntity)
    private readonly theftRepository: Repository<TheftEntity>,
  ) {}

  public async createTheft(body: TheftDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.theftRepository.save(body);
      // return { message: 'The theft has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getThefts(): Promise<TheftEntity[]> {
    try {
      const thefts: TheftEntity[] = await this.theftRepository.find();

      return thefts;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getTheftById(id: string) {
    try {
      const theft = await this.theftRepository
        .createQueryBuilder('thefts')
        .where({ id })
        .leftJoinAndSelect('thefts.theftTire', 'theftTire')
        .getOne();

      if (!theft) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No thefts found',
        });
      }
      return theft;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateTheft(
    id: string,
    body: UpdateTheftDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedTheft = await this.theftRepository.update(id, body);
      if (updatedTheft.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No thefts were updated',
        });
      }

      return updatedTheft;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteTheft(id: string): Promise<DeleteResult> {
    try {
      const theft: DeleteResult = await this.theftRepository.delete(id);

      if (!theft) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete theft',
        });
      }

      return theft;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
