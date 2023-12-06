import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjuredInfoDTO, UpdateInjuredInfoDTO } from '../dto/injured-info.dto';
import { InjuredInfoEntity } from '../entities/injured-info.entity';

@Injectable()
export class InjuredInfoService {
  constructor(
    @InjectRepository(InjuredInfoEntity)
    private readonly injuredInfoRepository: Repository<InjuredInfoEntity>,
  ) {}

  public async createInjuredInfo(body: InjuredInfoDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.injuredInfoRepository.save(body);
      // return { message: 'The injuredInfo has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInjuredInfos(): Promise<InjuredInfoEntity[]> {
    try {
      const injuredInfos: InjuredInfoEntity[] = await this.injuredInfoRepository.find();

      return injuredInfos;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInjuredInfoById(id: string) {
    try {
      const injuredInfo = await this.injuredInfoRepository
        .createQueryBuilder('injureds_info')
        .where({ id })
        .leftJoinAndSelect('injureds_info.injured', 'injured')
        .getOne();

      if (!injuredInfo) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No injuredInfos found',
        });
      }
      return injuredInfo;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateInjuredInfo(
    id: string,
    body: UpdateInjuredInfoDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedInjuredInfo = await this.injuredInfoRepository.update(id, body);
      if (updatedInjuredInfo.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No injuredInfos were updated',
        });
      }

      return updatedInjuredInfo;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteInjuredInfo(id: string): Promise<DeleteResult> {
    try {
      const injuredInfo: DeleteResult = await this.injuredInfoRepository.delete(id);

      if (!injuredInfo) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete injuredInfo',
        });
      }

      return injuredInfo;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }
}
