import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FireDTO, UpdateFireDTO } from '../dto/fire.dto';
import { FireEntity } from '../entities/fire.entity';

@Injectable()
export class FireService {
  constructor(
    @InjectRepository(FireEntity)
    private readonly fireRepository: Repository<FireEntity>,
  ) {}

  public async createFire(body: FireDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.fireRepository.save(body);
      // return { message: 'The fire has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getFires(): Promise<FireEntity[]> {
    try {
      const fires: FireEntity[] = await this.fireRepository.find();

      return fires;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getFireById(id: string) {
    try {
      const fire = await this.fireRepository.findOneBy({ id });

      if (!fire) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No fires found',
        });
      }
      return fire;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateFire(
    id: string,
    body: UpdateFireDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedFire = await this.fireRepository.update(id, body);
      if (updatedFire.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No fires were updated',
        });
      }

      return updatedFire;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteFire(id: string): Promise<DeleteResult> {
    try {
      const fire: DeleteResult = await this.fireRepository.delete(id);

      if (!fire) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete fire',
        });
      }

      return fire;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
