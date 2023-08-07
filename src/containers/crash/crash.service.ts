import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crash } from './entities/crash.entity';
import { Repository } from 'typeorm';
import { CrashDTO } from './dto/crash.dto';

@Injectable()
export class CrashService {
     constructor(
          @InjectRepository(Crash)
          private readonly crashRepository: Repository<Crash>,
     ){}

     public async createCrash(body: CrashDTO) : Promise<Crash>{
          try {
               return await this.crashRepository.save(body);
          } catch (error) {
               throw new Error(error)
          }
     };
};
