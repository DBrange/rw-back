import { Injectable } from '@nestjs/common';
import { LegalUserEntity } from '../entities/legal-user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { LegalUserDTO, UpdateLegalUserDTO } from '../dto/legal-user.dto';

@Injectable()
export class LegalUserService {
  constructor(
    @InjectRepository(LegalUserEntity)
    private readonly legalUserRepository: Repository<LegalUserEntity>,
  ) {}

  public async createLegalUser(body: LegalUserDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.legalUserRepository.save(body);
      // return { message: 'The legalUser has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getLegalUsers(): Promise<LegalUserEntity[]> {
    try {
      const users: LegalUserEntity[] = await this.legalUserRepository.find();

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getLegalUserById(id: string): Promise<LegalUserEntity> {
    try {
      const user = await this.legalUserRepository.findOneBy({ id });

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No legalUser found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateLegalUser(
    id: string,
    body: UpdateLegalUserDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.legalUserRepository.update(id, body);
      if (updatedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No legalUser were updated',
        });
      }
      return updatedUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deleteLegalUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.legalUserRepository.delete(id);

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete brand',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async verifyCuit(cuit: string | undefined) {
    try {
      const emailOrCuit = await this.legalUserRepository
        .createQueryBuilder('legal_users')
        .where({ cuit })
        .getOne();

      if (emailOrCuit) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }
}
