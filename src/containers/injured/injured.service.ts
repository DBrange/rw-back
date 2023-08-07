import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injured } from './entities/injured.entity';
import { Repository } from 'typeorm';
import { InjuredDTO } from './dto/injured.dto';

@Injectable()
export class InjuredService {
     constructor(
          @InjectRepository(Injured)
          private readonly injuredRepository: Repository<Injured>
     ){}

     public async createInjured(body: InjuredDTO){
          try {
               return await this.injuredRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};
