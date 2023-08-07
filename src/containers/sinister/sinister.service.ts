import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sinister } from './entities/sinister.entity';
import { Repository } from 'typeorm';
import { SinisterDTO } from './dto/sinister.dto';

@Injectable()
export class SinisterService {
     constructor(
          @InjectRepository(Sinister)
          private readonly sinisterRepository: Repository<Sinister>
     ){}

     public async createSinister(body: SinisterDTO): Promise<Sinister> {
          try {
               return await this.sinisterRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
};
