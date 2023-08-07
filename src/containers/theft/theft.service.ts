import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theft } from './entities/theft.entity';
import { Repository } from 'typeorm';
import { TheftDTO } from './dto/theft.dto';

@Injectable()
export class TheftService {
     constructor(
          @InjectRepository(Theft)
          private readonly theftRepository: Repository<Theft>
     ){}
  
     public async createTheft(body: TheftDTO): Promise<Theft> {
          try {
               return await this.theftRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};