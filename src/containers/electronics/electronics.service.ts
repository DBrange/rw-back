import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Electronics } from './entities/electronics.entity';
import { Repository } from 'typeorm';
import { ElectronicsDTO } from './dto/electronics.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ElectronicsService {
  constructor(
    @InjectRepository(Electronics)
    private readonly electronicRepository: Repository<Electronics>,
  ) {}

  // public async getAllElectronics(): Promise<Electronics[]> {
  //   try {
  //     const assets: Electronics[] = await this.electronicRepository.find({ 
  //       relations: ['smartphones'] });
  //     if (assets.length === 0) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No assets found',
  //       });
  //     }
  //     return assets;
  //   } catch (error) {
  //     throw ErrorManager.createSignaturError(error.message);
  //   }
  // };
  

  public async getAllElectronics(): Promise<Electronics[]> {
    try {
      const results: Electronics[] = await this.electronicRepository.find();
      if (results.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return results;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getElectronicById(id: string): Promise<Electronics> {
    try {
      const result = await this.electronicRepository
        .createQueryBuilder('electronics')
        .where({ id })
        //  .leftJoinAndSelect('electronics.smartphones', 'smartphones')
        .getOne();

      if (!result) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return result;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createElectronics(body: ElectronicsDTO): Promise<Electronics> {
    try {
      return await this.electronicRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}
