import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { Repository } from 'typeorm';
import { AssetDTO } from './dto/asset.dto';


@Injectable()
export class AssetService {
    
     constructor(
          @InjectRepository(Asset)
          private readonly assetRepository : Repository<Asset>,
          ){}

     
          public async createAsset(body: AssetDTO) : Promise<Asset> {
               try {
                    return await this.assetRepository.save(body);
               } catch (error) {
                    throw new Error(error);
               }
          };
};
