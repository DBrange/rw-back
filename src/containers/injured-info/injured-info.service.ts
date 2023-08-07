import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjuredInfo } from './entities/injuredInfo.entity';
import { Repository } from 'typeorm';
import { InjuredInfoDTO } from './dto/injuredInfo.dto';

@Injectable()
export class InjuredInfoService {
     constructor(
          @InjectRepository(InjuredInfo)
          private readonly injuredInfoRepository: Repository<InjuredInfo>
     ){}


     public async createInjuredInfo(body: InjuredInfoDTO){
          try {
               return await this.injuredInfoRepository.save(body);
          } catch (error) {
             throw new Error(error)  
          }
     }
};
