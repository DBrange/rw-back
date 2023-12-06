import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CrashDTO, UpdateCrashDTO } from '../dto/crash.dto';
import { CrashEntity } from '../entities/crash.entity';

@Injectable()
export class CrashService {
  constructor(
    @InjectRepository(CrashEntity)
    private readonly crashRepository: Repository<CrashEntity>,
  ) {}

  public async createCrash(body: CrashDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.crashRepository.save(body);
      // return { message: 'The crash has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getCrashs(): Promise<CrashEntity[]> {
    try {
      const crashs: CrashEntity[] = await this.crashRepository.find();

      return crashs;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getCrashById(id: string) {
    try {
      const crash = await this.crashRepository.findOneBy({id})

      if (!crash) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No crashs found',
        });
      }
      return crash;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateCrash(
    id: string,
    body: UpdateCrashDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedCrash = await this.crashRepository.update(id, body);
      if (updatedCrash.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No crashs were updated',
        });
      }

      return updatedCrash;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteCrash(id: string): Promise<DeleteResult> {
    try {
      const crash: DeleteResult = await this.crashRepository.delete(id);

      if (!crash) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete crash',
        });
      }

      return crash;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
