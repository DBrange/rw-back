import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Damage } from './entities/damage.entity';
import { Repository } from 'typeorm';
import { DamageDTO } from './dto/damage.dto';

@Injectable()
export class DamageService {
     constructor(
          @InjectRepository(Damage)
          private readonly damageRepository: Repository<Damage>
     ){}

     public async createDamage(body: DamageDTO) : Promise<Damage> {
          try {
               return await this.damageRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     }
};
