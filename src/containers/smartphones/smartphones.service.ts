import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Smartphone } from './entities/smartphone.entity';
import { Repository } from 'typeorm';
import { SmartphoneDTO } from './dto/smartphone.dto';

@Injectable()
export class SmartphonesService {
     constructor(
          @InjectRepository(Smartphone)
          private readonly smartphonesRepository: Repository<Smartphone>
     ){}


     public async createSmartphone(body: SmartphoneDTO): Promise<Smartphone>{
          try {
               return await this.smartphonesRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
};
