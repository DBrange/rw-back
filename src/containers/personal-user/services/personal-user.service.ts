import { Injectable } from '@nestjs/common';
import { PersonalUserEntity } from '../entities/personal.user.entity';
import { PersonalUserDTO, UpdatePersonalUserDTO } from '../dto/personal-user.dto';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { AUTHORIZATION } from 'src/constants/roles';

@Injectable()
export class PersonalUserService {
  constructor(
    @InjectRepository(PersonalUserEntity)
    private readonly personalUserRepository: Repository<PersonalUserEntity>,
  ) {}

  public async createPersonalUser(body: PersonalUserDTO) {
    try {
      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.personalUserRepository.save(body);
      // return { message: 'The personalUser has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getPersonalUsers(): Promise<PersonalUserEntity[]> {
    try {
      const users: PersonalUserEntity[] =
        await this.personalUserRepository.find();

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getPersonalUserById(id: string): Promise<PersonalUserEntity> {
    try {
      const user = await this.personalUserRepository.findOneBy({ id });

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No personalUsers found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updatePersonalUser(
    id: string,
    body: UpdatePersonalUserDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.personalUserRepository.update(id, body);
      if (updatedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No personalUsers were updated',
        });
      }
      return updatedUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async deletePersonalUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.personalUserRepository.delete(id);

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

  public async verifyDni(dni: string | undefined) {
    try {
      const emailOrDni = await this.personalUserRepository
        .createQueryBuilder('personal_users')
        .where({ dni })
        .andWhere({ authorization: AUTHORIZATION.AUTHORIZED })
        .getOne();

      if (emailOrDni) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }
}
