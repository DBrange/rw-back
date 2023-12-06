import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TheftTireDTO, UpdateTheftTireDTO } from '../dto/theft-tire.dto';
import { TheftTireEntity } from '../entities/theft-tire.entity';

@Injectable()
export class TheftTireService {
  constructor(
    @InjectRepository(TheftTireEntity)
    private readonly theftTireRepository: Repository<TheftTireEntity>,
  ) {}

  public async createTheftTire(body: TheftTireDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.theftTireRepository.save(body);
      // return { message: 'The theftTire has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getTheftTires(): Promise<TheftTireEntity[]> {
    try {
      const theftTires: TheftTireEntity[] = await this.theftTireRepository.find();

      return theftTires;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getTheftTireById(id: string) {
    try {
      const theftTire = await this.theftTireRepository
        .createQueryBuilder('thefts_tire')
        .where({ id })
        .leftJoinAndSelect('thefts_tire.theft', 'theft')
        .getOne();

      if (!theftTire) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No theftTires found',
        });
      }
      return theftTire;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateTheftTire(
    id: string,
    body: UpdateTheftTireDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedTheftTire = await this.theftTireRepository.update(id, body);
      if (updatedTheftTire.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No theftTires were updated',
        });
      }

      return updatedTheftTire;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteTheftTire(id: string): Promise<DeleteResult> {
    try {
      const theftTire: DeleteResult = await this.theftTireRepository.delete(id);

      if (!theftTire) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete theftTire',
        });
      }

      return theftTire;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
