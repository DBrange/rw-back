import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThirdPartyVehicle } from './entities/thirdPartyVehicle.entity';
import { Repository } from 'typeorm';
import { ThirdPartyVehicleDTO } from './dto/thirdPartyVehicle.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ThirdPartyVehicleService {
     constructor(
          @InjectRepository(ThirdPartyVehicle)
          private readonly thirdPartyVehicleRepository: Repository<ThirdPartyVehicle>
     ){}

     public async getAllVehicles(): Promise<ThirdPartyVehicle[]> {
          try {
            const resultados: ThirdPartyVehicle[] = await this.thirdPartyVehicleRepository.find();
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
      
        public async getVehicleById(id: string): Promise<ThirdPartyVehicle> {
          try {
            const resultado = await this.thirdPartyVehicleRepository
              .createQueryBuilder('asset')
              .where({ id })
              //  .leftJoinAndSelect('asset.asset', 'users')
              //  .leftJoinAndSelect('user.users', 'asset')
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

     public async createThirdPartyVehicle(body: ThirdPartyVehicleDTO): Promise<ThirdPartyVehicle>{
          try {
               return await this.thirdPartyVehicleRepository.save(body);
          } catch (error) {
               throw new Error(error)
          }
     }
};
