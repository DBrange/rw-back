import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fire } from './entities/fire.entity';
import { Repository } from 'typeorm';
import { FireDTO } from './dto/fire.dto';

@Injectable()
export class FireService {
     constructor(
          @InjectRepository(Fire)
          private readonly fireRepository: Repository<Fire>
     ){}

     public async createFire(body: FireDTO): Promise<Fire> {
          try {
               return await this.fireRepository.save(body);
          } catch (error) {
               throw new Error (error);
          }
     }
};
