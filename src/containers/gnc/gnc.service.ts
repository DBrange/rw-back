import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gnc } from './entities/gnc.entity';
import { Repository } from 'typeorm';
import { GncDTO } from './dto/gnc.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class GncService {
  constructor(
    @InjectRepository(Gnc)
    private readonly gncRepository: Repository<Gnc>,
  ) {}

  public async getAllGnc(): Promise<Gnc[]> {
    try {
      const resultsGnc: Gnc[] = await this.gncRepository.find();
      if (resultsGnc.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return resultsGnc;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getGncById(id: string): Promise<Gnc> {
    try {
      const resultGnc = await this.gncRepository
        .createQueryBuilder('gnc')
        .where({ id })
        .getOne();
      if (!resultGnc) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return resultGnc;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createGnc(body: GncDTO): Promise<Gnc> {
    try {
      return await this.gncRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
