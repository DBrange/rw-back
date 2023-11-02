import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import * as bcrypt from 'bcrypt';

import { UserUserBrokerDTO } from './dto/allUser.dto';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { LegalUsersService } from '../legal-users/legal-users.service';
import { LegalUsers } from '../legal-users/entities/legalUsers.entity';
import { AssetEntity } from '../asset/entities/asset.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { AuthService } from '../../auth/services/auth.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { AUTHORIZATION } from 'src/constants/roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userBrokerService: UserBrokerService,
    private readonly legalUserService: LegalUsersService,
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      // if (users.length === 0) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No users found',
      //   });
      // }

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async createUserInLogin(body: UserUserBrokerDTO) {
    try {
      let newBroker: UserBrokerEntity;

      if (body.userBrokerDTO) {
        newBroker = await this.userBrokerService.createUserBroker(
          body.userBrokerDTO,
        );
      }

      if (body.userDTO) {
        body.userDTO.password = await bcrypt.hash(body.userDTO.password, +process.env.HASH_SALT);
        const { email, id } = await this.userRepository.save({
          ...body.userDTO,
          broker: newBroker,
        });

        const token = await this.getToken({ email, id });

        const template = await this.getTemplate(email, token);

        await this.sendEmailForValidateNewUser(email, template);
      } else if (body.legalUserDTO) {
        body.legalUserDTO.password = await bcrypt.hash(body.legalUserDTO.password, +process.env.HASH_SALT);
        const { email, id } = await this.legalUserService.createLegalUsers({
          ...body.legalUserDTO,
          broker: newBroker,
        });

        const token = await this.getToken({ email, id });

        const template = await this.getTemplate(email, token);

        await this.sendEmailForValidateNewUser(email, template);
      }

      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return { message: 'El usuario a sido creado con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getAllUsers(): Promise<(UserEntity | LegalUsers)[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      const legalUsers: LegalUsers[] =
        await this.legalUserService.getAllLegalUsers();

      const allUsers = [...users, ...legalUsers];
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return allUsers;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsersById(id: string): Promise<UserEntity> {
    try {
      const userr = await this.userRepository.findOneBy({ id });
      const user =
        userr.role === 'CLIENT'
          ? await this.userRepository
              .createQueryBuilder('user')
              .where({ id })
              // .select([
              //   'user',
              //   'asset.id',
              //   'userBroker.id',
              //   'userBroker.bussinesName',
              //   'userBroker.enrollment',
              // ])
              // // .leftJoinAndSelect('user.broker', 'userBroker')
              .leftJoinAndSelect('user.userBroker', 'users')
              // .leftJoin('users.broker', 'userBroker')
              .leftJoinAndSelect('user.asset', 'asset')
              // .leftJoinAndSelect('asset.users', 'users')
              .leftJoinAndSelect('asset.legalUsers', 'legalUsers')
              .leftJoinAndSelect('asset.vehicle', 'vehicle')
              .leftJoinAndSelect('asset.electronics', 'electronics')
              .getOne()
          : await this.userRepository
              .createQueryBuilder('user')
              .where({ id })
              .select(['user', 'asset.id', 'userBroker.id'])
              .leftJoinAndSelect('user.broker', 'userBroker')
              // .leftJoinAndSelect('user.userBroker', 'users')
              // .leftJoinAndSelect('users.broker', 'userBroker')
              .leftJoinAndSelect('user.asset', 'asset')
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

  public async getAssetOfUser(id: string): Promise<AssetEntity[]> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.asset', 'asset')
        .leftJoinAndSelect('asset.vehicle', 'vehicle')
        .leftJoinAndSelect('asset.electronics', 'electronics')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return user.asset;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  // public async getSinistersOfUser(id: string) {

  // }

  //* parte de auth (autienticacion)
  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult> {
    try {
      const updatedUser = await this.userRepository.update(id, body);
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

  public async deleteUser(id: string): Promise<DeleteResult | void> {
    try {
      const deleteUser = await this.userRepository.delete(id);
      if (deleteUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User ${id} cannot be found or deleted`,
        });
      }
      return deleteUser;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async addClient(client: string, broker: string) {
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

      const clientToAdd = await this.userRepository.findOneBy({ id: client });

      if (!clientToAdd) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      await this.updateUser(client, {
        ...clientToAdd,
        userBroker: currentBroker,
      });

      return { message: 'El cliente a sido agregado con exito' };
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getToken(payload) {
    return jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
  }

  public async getTokenData(token) {
    let data = null;

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log('Error al obtener el token');
      } else {
        data = decode;
      }
    });

    return data;
  }

  public async sendEmailForValidateNewUser(
    email: string,
    html: any,
  ): Promise<void> {
    try {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const configService = new ConfigService();
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: `${configService.get('EMAIL_USER')}`,
          pass: `${configService.get('EMAIL_PASSWORD')}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
        requireTLS: true,
      });

      const mailOptions = {
        from: `Aqui esta su denuncia <${configService.get('EMAIL_USER')}>`,
        to: email,
        subject: 'Verificacion',
        text: 'Aqui esta la denuncia que solicito.',
        html,
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async getTemplate(email: string, token: string) {
    return `
    <head>
    <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
    
    <h3>Se creo una cuenta con tu mail: ${email}</h3>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
    <a
        href="http://localhost:3001/v1/users/confirm/${token}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>
`;
  }

  public async verifyEmailDni(
    email: string | undefined,
    dni: string | undefined,
    enrollment: string | undefined,
  ) {
    try {
      if (enrollment) {
        const verifyEnrollment = await this.userBrokerService.verifyEnrollment(
          enrollment,
        );
        if (verifyEnrollment) return true;
      }

      const emailOrDni = await this.userRepository
        .createQueryBuilder('user')
        .where({ email })
        .orWhere({ dni })
        .getOne();

      const emailOrCuit = await this.legalUserService.verifyEmailCuit(
        email,
        dni,
        enrollment,
      );

      if (emailOrDni || emailOrCuit) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async confirmEmail(token: string) {
    const data = await this.getTokenData(token);

    if (!data) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Problems with get token',
      });
    }

    const { email, id } = data.data;

    const user = (await this.userRepository.findOneBy({ email })) || null;

    if (!user === null) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Problems with get token',
      });
    }

    if (id !== user.id) {
      return false;
    }

    await this.updateUser(user.id, {
      ...user,
      authorization: AUTHORIZATION.AUTHORIZED,
    });

    return true;
  }
  // public async addClient(client: string, broker: string) {
  //   try {
  //     // const currentBroker = await this.userBrokerService.getUserBrokerById(
  //     //   broker,
  //     // );

  //     // if (!currentBroker) {
  //     //   throw new ErrorManager({
  //     //     type: 'BAD_REQUEST',
  //     //     message: 'No users found',
  //     //   });
  //     // }

  //     const clientToAdd = await this.userRepository.findOneBy({ id: client });
  //     const userBrokerr = await this.userRepository
  //       .createQueryBuilder('user')
  //       .where({ id: broker })
  //       .leftJoinAndSelect('user.broker', 'broker')
  //       .getOne();

  //     const currentBroker = await this.userBrokerService.getUserBrokerById(
  //       userBrokerr.broker.id,
  //     );
  //     console.log(userBrokerr.broker.id);

  //     if (!clientToAdd) {
  //       throw new ErrorManager({
  //         type: 'BAD_REQUEST',
  //         message: 'No users found',
  //       });
  //     }

  //     await this.updateUser(client, {
  //       ...clientToAdd,
  //       userBroker: userBrokerr,
  //     });

  //     // currentBroker.clients.push(clientToAdd);

  //     // await this.userBrokerService.updateUserBroker(currentBroker.id, {
  //     //   ...currentBroker
  //     // });

  //     return { message: 'El cliente a sido agregado con exito' };
  //   } catch (error) {
  //     throw new ErrorManager.createSignaturError(error.message);
  //   }
  // }
}
