import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LegalUsers } from './entities/legalUsers.entity';
import { Repository } from 'typeorm';
import {  LegalUsersDTO } from './dto/legalUsers.dto';

@Injectable()
export class LegalUsersService {
     constructor(
          @InjectRepository(LegalUsers)
          private readonly legalUsersRepository: Repository<LegalUsers>
     ){}

     public async createLegalUsers(body: LegalUsersDTO): Promise<LegalUsers> {
          try {
               return await this.legalUsersRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
};
