import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LegalUsers } from './entities/legalUsers.entity';
import { Repository, UpdateResult } from 'typeorm';
import { LegalUsersDTO, LegalUsersUpdateDTO } from './dto/legalUsers.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { AssetEntity } from '../asset/entities/asset.entity';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserUpdateDTO } from '../users/dto/user.dto';

@Injectable()
export class LegalUsersService {
  constructor(
    @InjectRepository(LegalUsers)
    private readonly legalUsersRepository: Repository<LegalUsers>,
    private readonly userBrokerService: UserBrokerService,
  ) {}

  public async getAllLegalUsers(): Promise<LegalUsers[]> {
    try {
      const resultados: LegalUsers[] = await this.legalUsersRepository.find();
      // if (resultados.length === 0) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No users found',
      //   });
      // }
      return resultados;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async verifyEmailCuit(
    email: string | undefined,
    cuit: string | undefined,
    enrollment: string | undefined,
  ) {
    try {
      if (enrollment) {
        const verifyEnrollment = await this.userBrokerService.verifyEnrollment(
          enrollment,
        );
        if (verifyEnrollment) true;
      }

      const emailOrCuit = await this.legalUsersRepository
        .createQueryBuilder('user')
        .where({ email })
        .orWhere({ cuit })
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

  public async getLegalUserById(id: string): Promise<LegalUsers> {
    try {
      // const resultado = await this.legalUsersRepository
      //   .createQueryBuilder('legal_users')
      //   .where({ id })
      //   .select(['legal_users', 'asset.id'])
      //   .leftJoinAndSelect('legal_users.asset', 'asset')
      //   .getOne();

      // if (!resultado) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No users found',
      //   });
      // }
      // return resultado;

      const userr = await this.legalUsersRepository.findOneBy({ id });
      const user =
        userr.role === 'CLIENT'
          ? await this.legalUsersRepository
              .createQueryBuilder('legal_users')
              .where({ id })
              // .select([
              //   'user',
              //   'asset.id',
              //   'userBroker.id',
              //   'userBroker.bussinesName',
              //   'userBroker.enrollment',
              // ])
              // // .leftJoinAndSelect('user.broker', 'userBroker')
              .leftJoinAndSelect('legal_users.userBroker', 'users')
              // .leftJoin('users.broker', 'userBroker')
              .leftJoinAndSelect('legal_users.asset', 'asset')
              // .leftJoinAndSelect('asset.users', 'users')
              .leftJoinAndSelect('asset.legalUsers', 'legalUsers')
              .leftJoinAndSelect('asset.vehicle', 'vehicle')
              .leftJoinAndSelect('asset.electronics', 'electronics')
              .getOne()
          : await this.legalUsersRepository
              .createQueryBuilder('legal_users')
              .where({ id })
              .select(['legal_users', 'asset.id', 'userBroker.id'])
              .leftJoinAndSelect('legal_users.broker', 'userBroker')
              // .leftJoinAndSelect('user.userBroker', 'users')
              // .leftJoinAndSelect('users.broker', 'userBroker')
              .leftJoinAndSelect('legal_users.asset', 'asset')
              // .leftJoinAndSelect('asset.users', 'users')
              .leftJoinAndSelect('asset.legalUsers', 'legalUsers')
              .leftJoinAndSelect('asset.vehicle', 'vehicle')
              .leftJoinAndSelect('asset.electronics', 'electronics')
              .getOne();

      // const user = await this.userRepository
      //   .createQueryBuilder('user')
      //   .where({ id })
      //   .select(['user', 'asset.id', 'userBroker.id'])
      //   .leftJoinAndSelect('user.broker', 'userBroker')
      //   .leftJoin('user.userBroker', 'userBroker.id')
      //   .leftJoin('user.asset', 'asset')
      //   .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
  public async getAssetOfLegalUser(id: string): Promise<AssetEntity[]> {
    try {
      const legalUser = await this.legalUsersRepository
        .createQueryBuilder('legal_users')
        .where({ id })
        .leftJoinAndSelect('legal_users.asset', 'asset')
        .leftJoin('asset.vehicle', 'vehicle')
        .addSelect('vehicle.brand')
        .addSelect('vehicle.model')
        .addSelect('vehicle.plate')
        .addSelect('vehicle.type')
        .leftJoin('asset.electronics', 'electronics')
        .addSelect('electronics.brand')
        .addSelect('electronics.model')
        .addSelect('electronics.type')
        .getOne();

      if (!legalUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return legalUser.asset;
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
  }

  public async updateLegalUser(
    id: string,
    body: LegalUsersUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.legalUsersRepository.update(id, body);
      if (updatedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users were updated',
        });
      }
      return updatedUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async addLegalClient(client: string, broker: string) {
    try {
      const currentBroker = await this.userBrokerService.getUserBrokerById(
        broker,
      );

      if (!currentBroker) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      const clientToAdd = await this.legalUsersRepository.findOneBy({
        id: client,
      });

      if (!clientToAdd) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      await this.updateLegalUser(client, {
        ...clientToAdd,
        userBroker: currentBroker,
      });

      return { message: 'El cliente a sido agregado con exito' };
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof LegalUsersDTO; value: any }) {
    try {
      const user: LegalUsers = await this.legalUsersRepository
        .createQueryBuilder('legal_users')
        .addSelect('legal_users.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }
}
