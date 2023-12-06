import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { DamageDTO, UpdateDamageDTO } from '../dto/damage.dto';
import { DamageEntity } from '../entities/damage.entity';

@Injectable()
export class DamageService {
  constructor(
    @InjectRepository(DamageEntity)
    private readonly damageRepository: Repository<DamageEntity>,
  ) {}

  public async createDamage(body: DamageDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.damageRepository.save(body);
      // return { message: 'The damage has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getDamages(): Promise<DamageEntity[]> {
    try {
      const damages: DamageEntity[] = await this.damageRepository.find();

      return damages;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getDamageById(id: string) {
    try {
      const damage = await this.damageRepository.findOneBy({id})

      if (!damage) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No damages found',
        });
      }
      return damage;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateDamage(
    id: string,
    body: UpdateDamageDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedDamage = await this.damageRepository.update(id, body);
      if (updatedDamage.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No damages were updated',
        });
      }

      return updatedDamage;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteDamage(id: string): Promise<DeleteResult> {
    try {
      const damage: DeleteResult = await this.damageRepository.delete(id);

      if (!damage) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete damage',
        });
      }

      return damage;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
