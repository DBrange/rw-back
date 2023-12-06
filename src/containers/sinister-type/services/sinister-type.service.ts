import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { SinisterTypeEntity } from '../entities/sinister-type.entity';
import { SinisterTypeDTO, UpdateSinisterTypeDTO } from '../dto/sinister-type.dto';

@Injectable()
export class SinisterTypeService {
  constructor(
    @InjectRepository(SinisterTypeEntity)
    private readonly sinisterTypeRepository: Repository<SinisterTypeEntity>,
  ) {}

  public async createSinisterType(body: SinisterTypeDTO) {
    try {
      return await this.sinisterTypeRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSinisterTypes(): Promise<SinisterTypeEntity[]> {
    try {
      const sinisterTypes: SinisterTypeEntity[] = await this.sinisterTypeRepository.find();

      return sinisterTypes;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getSinisterTypeById(id: string) {
    try {
      const sinisterType = await this.sinisterTypeRepository
        .createQueryBuilder('sinisters_type')
        .where({ id })
        .leftJoinAndSelect('sinisters_type.theft', 'theft')
        .leftJoinAndSelect('theft.theftTire', 'theftTire')
        .leftJoinAndSelect('sinisters_type.fire', 'fire')
        .leftJoinAndSelect('sinisters_type.crash', 'crash')
        .leftJoinAndSelect('sinisters_type.damage', 'damage')
        .getOne();

      if (!sinisterType) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No sinisterTypes found',
        });
      }
      return sinisterType;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateSinisterType(
    id: string,
    body: UpdateSinisterTypeDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedSinisterType = await this.sinisterTypeRepository.update(id, body);
      if (updatedSinisterType.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No sinisterTypes were updated',
        });
      }

      return updatedSinisterType;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteSinisterType(id: string): Promise<DeleteResult> {
    try {
      const sinisterType: DeleteResult = await this.sinisterTypeRepository.delete(id);

      if (!sinisterType) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete sinisterType',
        });
      }

      return sinisterType;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
