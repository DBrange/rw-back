import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gnc } from './entities/gnc.entity';
import { Repository } from 'typeorm';
import { GncDTO } from './dto/gnc.dto';

@Injectable()
export class GncService {
     
     constructor(
     @InjectRepository(Gnc)
     private readonly gncRepository: Repository<Gnc>
     ){}


     public async createGnc(body: GncDTO): Promise<Gnc> {
          try {
               return await this.gncRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};
