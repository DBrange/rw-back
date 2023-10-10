import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LegalUsers } from './entities/legalUsers.entity';
import { Repository } from 'typeorm';
import { LegalUsersDTO } from './dto/legalUsers.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class LegalUsersService {
     constructor(
          @InjectRepository(LegalUsers)
          private readonly legalUsersRepository: Repository<LegalUsers>
     ){}

     public async getAllLegalUsers(): Promise<LegalUsers[]> {
          try {
            const resultados: LegalUsers[] = await this.legalUsersRepository.find();
            if (resultados.length === 0) {
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No users found',
              });
            }
            return resultados;
          } catch (error) {
            throw new ErrorManager.createSignaturError(error.message);
          }
        }
      
        public async getLegalUserById(id: string): Promise<LegalUsers> {
          try {
            const resultado = await this.legalUsersRepository
              .createQueryBuilder('legal_users')
              .where({ id })
              .leftJoinAndSelect('legal_users.asset', 'asset')
              .getOne();
      
            if (!resultado) {
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No users found',
              });
            }
            return resultado;
          } catch (error) {
            throw new ErrorManager.createSignaturError(error.message);
          }
        }

     public async createLegalUsers(body: LegalUsersDTO): Promise<LegalUsers> {
          try {
               return await this.legalUsersRepository.save(body);
          } catch (error) {
               throw new Error(error);
          }
     };
};
