import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { GncDTO, UpdateGncDTO } from '../dto/gnc.dto';
import { GncEntity } from '../entities/gnc.entity';

@Injectable()
export class GncService {
  constructor(
    @InjectRepository(GncEntity)
    private readonly gncRepository: Repository<GncEntity>,
  ) {}

  public async createGnc(body: GncDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.gncRepository.save(body);
      // return { message: 'The gnc has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getGncs(): Promise<GncEntity[]> {
    try {
      const gncs: GncEntity[] = await this.gncRepository.find();

      return gncs;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getGncById(id: string) {
    try {
      const gnc = await this.gncRepository
        .createQueryBuilder('gncs')
        .where({ id })
        .leftJoinAndSelect('gncs.vehicle', 'vehicle')
        .getOne();

      if (!gnc) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No gnc found',
        });
      }
      return gnc;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateGnc(
    id: string,
    body: UpdateGncDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedGnc = await this.gncRepository.update(id, body);
      if (updatedGnc.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No gncs were updated',
        });
      }

      return updatedGnc;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteGnc(id: string): Promise<DeleteResult> {
    try {
      const gnc: DeleteResult = await this.gncRepository.delete(id);

      if (!gnc) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete gnc',
        });
      }

      return gnc;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
