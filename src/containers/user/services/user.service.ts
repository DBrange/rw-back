import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UserDTO, UpdateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  AccessLevelData,
  DateData,
  QuantityData,
} from '../interfaces/user.interface';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { differenceInWeeks, startOfWeek, differenceInMonths } from 'date-fns';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(body: UserDTO) {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);

      return await this.userRepository.save(body);
      // return { message: 'The user has been created successfully.' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      return users;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getUserByIdForOnlyBroker(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.broker', 'brokers')
        .getOne();

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
  public async getUserById(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.brokerAssets', 'brokerAssets')
        .leftJoinAndSelect('brokerAssets.sinisters', 'brokerAssetsSinisters')
        .leftJoinAndSelect('users.receivedNotifications', 'notifications')
        // .leftJoinAndSelect('brokerAssets.vehicle', 'vehicle')
        // .leftJoinAndSelect('brokerAssets.electronic', 'electronic')
        .leftJoinAndSelect('users.assets', 'assets')
        .leftJoinAndSelect('assets.vehicle', 'vehicle')
        .leftJoinAndSelect('assets.electronic', 'electronic')
        .leftJoinAndSelect('assets.sinisters', 'sinisters')
        .leftJoinAndSelect('assets.client', 'client')
        .leftJoinAndSelect('client.personalUser', 'clientPersonalUser')
        .leftJoinAndSelect('client.legalUser', 'clientLegalUser')
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoinAndSelect('userBroker.clients', 'clients')
        .leftJoinAndSelect('users.broker', 'brokers')
        .leftJoinAndSelect('clients.personalUser', 'clientsPersonalUser')
        .leftJoinAndSelect('clients.legalUser', 'clientsLegalUsers')
        .getOne();

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

  public async getUserByIdForProfile(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .leftJoinAndSelect('users.broker', 'brokers')
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoinAndSelect('users.receivedNotifications', 'notifications')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      if (user.role === 'CLIENT' && user.broker) {
        const allBrokers = user.broker as unknown as UserBrokerEntity[];

        const userBrokersPromises = allBrokers.map(async (brokerEntity) => {
          const findUserBroker = await this.userRepository
            .createQueryBuilder('users')
            .where({ userBroker: brokerEntity.id })
            .leftJoinAndSelect('users.legalUser', 'legalUser')
            .leftJoinAndSelect('users.personalUser', 'personalUser')
            .getOne();

          return findUserBroker;
        });

        const borkers = await Promise.all(userBrokersPromises);

        return { ...user, brokerUser: borkers };
      }

      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getBrokers(
    id: string,
    searchField: string,
    typeToFilter: string,
    page: number,
    limit: number,
  ) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .leftJoinAndSelect('users.broker', 'brokers')
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoinAndSelect('users.receivedNotifications', 'notifications')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      if (user.role === 'CLIENT' && user.broker) {
        const allBrokers = user.broker as unknown as UserBrokerEntity[];

        const userBrokersPromises = allBrokers.map(async (brokerEntity) => {
          const findUserBroker = await this.userRepository
            .createQueryBuilder('users')
            .where({ userBroker: brokerEntity.id })
            .leftJoinAndSelect('users.legalUser', 'legalUser')
            .leftJoinAndSelect('users.personalUser', 'personalUser')
            .getOne();

          return findUserBroker;
        });

        const brokers = await Promise.all(userBrokersPromises);

              const regex = new RegExp(`^${searchField}`, 'i');
              const filteredBrokers = (
                brokers as unknown as UserEntity[]
              ).filter((broker) => {
                console.log(broker);
                if (typeToFilter === 'user' && broker.personalUser?.dni) {
                  return broker.personalUser?.dni
                    .toLowerCase()
                    .includes(searchField.toLowerCase());
                } else if (
                  typeToFilter === 'legalUser' &&
                  broker.legalUser?.cuit
                ) {
                  return broker.legalUser.cuit
                    .toLowerCase()
                    .includes(searchField.toLowerCase());
                }

                return false;
              });

              const pageSize = limit;
              const start = (page - 1) * pageSize;
              const end = start + pageSize;

              const paginatedBrokers = filteredBrokers.slice(start, end);

              return paginatedBrokers;
        // return { brokerUser: borkers };
      }

      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }






  public async updateOnlyBroker(id: string, body: UpdateUserDTO) {
    try {
      await this.userRepository
        .createQueryBuilder()
        .relation(UserEntity, 'broker')
        .of(id)
        .add(body.broker);

      return { msg: 'Ha sido actualizado con exito' };
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UpdateUserDTO,
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

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete user',
        });
      }

      return user;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  public async updateLastRecord(userId: string, date: Date) {
    const user = await this.userRepository.findOneBy({ id: userId });
    await this.updateUser(userId, { ...user, lastRecord: date });

    return { message: 'lastRecord ha sido actualizado con exito' };
  }

  public async verifyEmail(email: string | undefined) {
    try {
      const emailOrDni = await this.userRepository
        .createQueryBuilder('users')
        .where({ email })
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

  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('users')
        .addSelect('users.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getInspectionsOfClient(id: string) {
    const client = await this.userRepository
      .createQueryBuilder('users')
      .where({ id })
      .leftJoinAndSelect('users.assets', 'assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .getOne();

    if (!client) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No users found',
      });
    }

    return client.assets;
  }

  public async getInspectionsOfClients(id: string) {
    const client = await this.userRepository
      .createQueryBuilder('users')
      .where({ id })
      .leftJoinAndSelect('users.assets', 'assets')
      .leftJoin('assets.vehicle', 'vehicle')
      .addSelect('vehicle.id')
      .addSelect('vehicle.brand')
      .addSelect('vehicle.model')
      .addSelect('vehicle.plate')
      .addSelect('vehicle.type')
      .leftJoin('assets.electronic', 'electronic')
      .addSelect('electronic.id')
      .addSelect('electronic.brand')
      .addSelect('electronic.model')
      .addSelect('electronic.type')
      .leftJoin('electronic.smartphone', 'smartphone')
      .addSelect('smartphone.imei')
      .getOne();

    if (!client) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No users found',
      });
    }

    return client.assets;
  }

  public async getClientById(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getBrokerById(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.assets', 'assets')
        .leftJoin('assets.vehicle', 'vehicle')
        .addSelect('vehicle.brand')
        .addSelect('vehicle.model')
        .addSelect('vehicle.plate')
        .addSelect('vehicle.type')
        .leftJoin('assets.electronic', 'electronic')
        .addSelect('electronic.brand')
        .addSelect('electronic.model')
        .addSelect('electronic.type')
        .leftJoin('assets.sinisters', 'sinisters')
        .addSelect('sinisters.id')
        .leftJoinAndSelect('assets.client', 'client')
        .leftJoinAndSelect('client.personalUser', 'clientPersonalUser')
        .leftJoinAndSelect('client.legalUser', 'clientLegalUser')
        .leftJoinAndSelect('users.personalUser', 'personalUser')
        .leftJoinAndSelect('users.legalUser', 'legalUsers')
        .leftJoinAndSelect('users.broker', 'brokers')
        .leftJoinAndSelect('users.brokerAssets', 'brokerAssets')
        .leftJoinAndSelect('brokerAssets.sinisters', 'brokerAssetsSinisters')
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoinAndSelect('userBroker.clients', 'clients')
        .leftJoinAndSelect('clients.personalUser', 'clientsPersonalUser')
        .leftJoinAndSelect('clients.legalUser', 'clientsLegalUsers')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async getClientNotificationsById(id: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .leftJoinAndSelect('users.receivedNotifications', 'notifiations')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      return user.receivedNotifications;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async findUserByEmail(value: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('users')
        .select(['users.email', 'users.id'])
        .where({ email: value })
        .leftJoinAndSelect('users.userBroker', 'userBroker')
        .leftJoin('users.personalUser', 'personalUser')
        .addSelect('personalUser.name')
        .addSelect('personalUser.lastName')
        .addSelect('personalUser.dni')
        .leftJoin('users.legalUser', 'legalUser')
        .addSelect('legalUser.companyName')
        .addSelect('legalUser.cuit')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      if (user.userBroker) return {};
      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async updateMyProfile(
    userId: string,
    phoneNumber: string,
    address: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (phoneNumber !== 'undefined') user.phoneNumber = phoneNumber;
    if (address !== 'undefined') user.address = address;

    await this.updateUser(userId, user);

    return { message: 'El usuario ha sido actualizado con exito' };
  }

  public async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No users found',
      });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);

    if (!validPassword) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'No passwords match',
      });
    }

    if (validPassword) {
      const password = await bcrypt.hash(newPassword, +process.env.HASH_SALT);

      await this.updateUser(userId, { ...user, password });

      return { message: 'La contraseña a sido modificada con exito' };
    }
  }

  public getTemplateForForgottemPassword(email: string, password: string) {
    return `
      <head>
        <link rel="stylesheet" href="./style.css">
      </head>
      <div id="email___content">
        <h3>Aqui tienes tu nueva contraseña para poder ingresar a tu cuenta</h3>
        <p>Email: ${email}</p>
        <p>Contraseña: ${password}</p>

        <h4>Ingrese por aqui: http://localhost:5173/public/login</h4>
      </div>
`;
  }

  public async newPasswordForForgottem(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No user found',
        });
      }

      const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const specialChars = '.';

      // Combina los conjuntos de caracteres
      const allChars =
        lowercaseLetters + uppercaseLetters + numbers + specialChars;

      // Función para obtener un carácter aleatorio
      const getRandomChar = (set) =>
        set[Math.floor(Math.random() * set.length)];

      // Genera la contraseña con al menos un carácter de cada conjunto
      const password =
        getRandomChar(lowercaseLetters) +
        getRandomChar(uppercaseLetters) +
        getRandomChar(numbers) +
        getRandomChar(specialChars) +
        Array.from({ length: 8 }, () => getRandomChar(allChars)).join('');

      // Mezcla los caracteres para mayor aleatoriedad
      const shuffledPassword = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

      const newPassword = await bcrypt.hash(
        shuffledPassword,
        +process.env.HASH_SALT,
      );

      await this.updateUser(user.id, {
        ...user,
        password: newPassword,
      });

      await this.sendEmailForForgottemPassword(
        email,
        this.getTemplateForForgottemPassword(email, shuffledPassword),
      );

      return { message: 'Su contraseña ha sido actualizada con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  public async sendEmailForForgottemPassword(
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
        from: `Recuperar contraseña <${configService.get('EMAIL_USER')}>`,
        to: email,
        subject: 'Recuperar contraseña',
        text: 'Nueva contraseña',
        html,
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
    }
  }

  //------------------------------

  // Admin

  public async getUsersForAdmin(
    searchField: string,
    typeToFilter: string,
    typeToFilterUser: string,
    page: number,
    limit: number,
  ): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository
        .createQueryBuilder('users')
        .select(['users.id', 'users.created_at', 'users.updated_at'])
        .leftJoin('users.personalUser', 'personalUser')
        .addSelect('personalUser.name')
        .addSelect('personalUser.lastName')
        .addSelect('personalUser.dni')
        .leftJoin('users.legalUser', 'legalUser')
        .addSelect('legalUser.companyName')
        .addSelect('legalUser.cuit')
        .leftJoin('users.userBroker', 'userBroker')
        .addSelect('userBroker.id')
        .getMany();

      const regex = new RegExp(`^${searchField}`, 'i');
      const filteredAndSearchUsers = users.filter((user) => {
        if (typeToFilterUser === 'broker' && user.userBroker) {
          if (typeToFilter === 'user' && user.personalUser?.dni) {
            return regex.test(user.personalUser?.dni);
          } else if (typeToFilter === 'legalUser' && user.legalUser?.cuit) {
            return regex.test(user.legalUser.cuit);
          } else if (typeToFilter === '') {
            return (
              regex.test(user.personalUser?.dni) ||
              regex.test(user.legalUser.cuit)
            );
          }
        } else if (typeToFilterUser === 'client' && !user.userBroker) {
          if (typeToFilter === 'user' && user.personalUser?.dni) {
            return regex.test(user.personalUser?.dni);
          } else if (typeToFilter === 'legalUser' && user.legalUser?.cuit) {
            console.log('hola?');
            return regex.test(user.legalUser.cuit);
          } else if (typeToFilter === '') {
            return (
              regex.test(user.personalUser?.dni) ||
              regex.test(user.legalUser.cuit)
            );
          }
        } else {
          return false;
        }
      });

      const pageSize = limit;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedInspections = filteredAndSearchUsers.slice(start, end);

      return paginatedInspections;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async dashboardIncome() {
    try {
      const users: UserEntity[] = await this.getUsers(); // Ajusta según tu lógica de obtener usuarios

      // Obtén la fecha actual
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // Mes actual (0-11)
      const currentWeek = Math.ceil(currentDate.getDate() / 7); // Semana actual

      // Inicializa arrays para las ganancias mensuales y semanales
      const lastMonths: number[] = Array(12).fill(0);
      const lastWeeks: number[] = Array(12).fill(0);

      const accessLevelRates: Record<ACCESS_LEVEL, number> = {
        [ACCESS_LEVEL.FREE]: 0,
        [ACCESS_LEVEL.BASIC]: 5,
        [ACCESS_LEVEL.PREMIUM]: 10,
        [ACCESS_LEVEL.PRO]: 15,
      };

      // Recorre los usuarios y cuenta las ganancias en los últimos 12 meses y semanas
      users.forEach((user) => {
        const userDate = user.created_at; // Ajusta a la propiedad de fecha de registro en tu entidad
        const userMonth = userDate.getMonth();
        const userWeek = Math.ceil(userDate.getDate() / 7);

        // Incrementa las ganancias mensuales basadas en el nivel de acceso del usuario
        const monthIndex = differenceInMonths(currentDate, userDate);
        if (monthIndex >= 0 && monthIndex < 12) {
          lastMonths[monthIndex] += accessLevelRates[user.accessLevel];
        }

        // Incrementa las ganancias semanales basadas en el nivel de acceso del usuario
        const weekIndex = differenceInWeeks(currentDate, startOfWeek(userDate));
        if (weekIndex >= 0 && weekIndex < 12) {
          lastWeeks[weekIndex] += accessLevelRates[user.accessLevel];
        }
      });

      // Devuelve el resultado
      return [
        {
          label: 'Ganancias',
          months: lastMonths.reverse(), // Invierte el array para representar correctamente los últimos 12 meses
          weeks: lastWeeks.reverse(), // Invierte el array para representar correctamente las últimas 12 semanas
        },
      ];
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async dashboardNewUser() {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      const lastMonths: number[] = Array(12).fill(0);
      const lastWeeks: number[] = Array(12).fill(0);

      users.forEach((user) => {
        const userDate = user.created_at;

        if (userDate instanceof Date) {
          const userYear = userDate.getFullYear();

          // Calcular el índice del mes
          const monthIndex =
            (currentYear - userYear) * 12 +
            currentDate.getMonth() -
            userDate.getMonth();

          if (monthIndex >= 0 && monthIndex < 12) {
            lastMonths[monthIndex] += 1;
          }

          // Calcular el índice de la semana utilizando date-fns
          const weekIndex = differenceInWeeks(
            currentDate,
            startOfWeek(userDate),
          );

          if (weekIndex >= 0 && weekIndex < 12) {
            lastWeeks[weekIndex] += 1;
          }
        }
      });

      return [
        {
          label: 'Usuarios',
          months: lastMonths.reverse(),
          weeks: lastWeeks.reverse(),
        },
      ];
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async dashboardUserRole() {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentWeek = Math.ceil(currentDate.getDate() / 7);

      const userCountData: DateData[] = [
        {
          label: 'Brokers',
          months: Array(12).fill(0),
          weeks: Array(12).fill(0),
        },
        {
          label: 'Clients',
          months: Array(12).fill(0),
          weeks: Array(12).fill(0),
        },
      ];

      users.forEach((user) => {
        const userDate = user.created_at;
        const userRole = user.role;

        if (userDate instanceof Date && typeof userRole === 'string') {
          // Calcular la diferencia en meses y semanas
          const monthIndex = differenceInMonths(currentDate, userDate);
          const weekIndex = differenceInWeeks(
            currentDate,
            startOfWeek(userDate),
          );

          // Contar en los últimos 12 meses (excluyendo el mes actual)
          if (monthIndex >= 0 && monthIndex < 12) {
            switch (userRole) {
              case 'BROKER':
                userCountData[0].months[11 - monthIndex] += 1;
                break;
              case 'CLIENT':
                userCountData[1].months[11 - monthIndex] += 1;
                break;
              default:
                break;
            }
          }

          // Contar en las últimas 12 semanas (invertir el orden)
          if (weekIndex >= 0 && weekIndex < 12) {
            switch (userRole) {
              case 'BROKER':
                userCountData[0].weeks[11 - weekIndex] += 1;
                break;
              case 'CLIENT':
                userCountData[1].weeks[11 - weekIndex] += 1;
                break;
              default:
                break;
            }
          }
        }
      });

      return userCountData;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async dashboardLevelBrokers() {
    try {
      const users: UserEntity[] = await this.userRepository.find();

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentWeek = Math.ceil(currentDate.getDate() / 7);

      const accessLevelData: AccessLevelData = {
        [ACCESS_LEVEL.FREE]: {
          months: Array(12).fill(0),
          weeks: Array(12).fill(0),
        },
        [ACCESS_LEVEL.BASIC]: {
          months: Array(12).fill(0),
          weeks: Array(12).fill(0),
        },
        [ACCESS_LEVEL.PREMIUM]: {
          months: Array(12).fill(0),
          weeks: Array(12).fill(0),
        },
        [ACCESS_LEVEL.PRO]: {
          months: Array(12).fill(0),
          weeks: Array(12).fill(0),
        },
      };

      users.forEach((user) => {
        const userDate = user.created_at;
        const userAccessLevel = user.accessLevel;

        if (userDate instanceof Date && userAccessLevel !== undefined) {
          const monthIndex = differenceInMonths(currentDate, userDate);
          const weekIndex = differenceInWeeks(
            currentDate,
            startOfWeek(userDate),
          );

          // Contar en los últimos 12 meses
          if (monthIndex >= 0 && monthIndex < 12) {
            accessLevelData[userAccessLevel].months[11 - monthIndex] += 1;
          }

          // Contar en las últimas 12 semanas
          if (weekIndex >= 0 && weekIndex < 12) {
            accessLevelData[userAccessLevel].weeks[11 - weekIndex] += 1;
          }
        }
      });

      return accessLevelData;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async dashboardCurrentServices() {
    try {
      const users: UserEntity[] = await this.getUsers();

      // Inicializar el objeto para almacenar los resultados por nivel de acceso
      const serviceData: QuantityData[] = [
        {
          label: 'Servicios',
          numbers: [0, 0, 0, 0],
        },
      ];

      // Contar usuarios por nivel de acceso
      users.forEach((user) => {
        const userAccessLevel = user.accessLevel; // Ajusta a la propiedad de nivel de acceso en tu entidad

        if (userAccessLevel !== undefined) {
          // Incrementar el contador correspondiente al nivel de acceso
          switch (userAccessLevel) {
            case ACCESS_LEVEL.FREE:
              serviceData[0].numbers[0]++;
              break;
            case ACCESS_LEVEL.BASIC:
              serviceData[0].numbers[1]++;
              break;
            case ACCESS_LEVEL.PREMIUM:
              serviceData[0].numbers[2]++;
              break;
            case ACCESS_LEVEL.PRO:
              serviceData[0].numbers[3]++;
              break;
            default:
              // Tratar otros casos si es necesario
              break;
          }
        }
      });

      // Devolver el resultado
      return serviceData;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async dashboardUsersQuantity() {
    try {
      const users: UserEntity[] = await this.getUsers();

      // Inicializar el objeto para almacenar los resultados por rol
      const userData: QuantityData[] = [
        {
          label: 'Usuarios',
          numbers: [0, 0],
        },
      ];

      // Contar usuarios por rol
      users.forEach((user) => {
        const userRole = user.role; // Ajusta a la propiedad de rol en tu entidad

        if (userRole !== undefined) {
          // Incrementar el contador correspondiente al rol
          switch (userRole) {
            case ROLES.CLIENT:
              userData[0].numbers[0]++;
              break;
            case ROLES.BROKER:
              userData[0].numbers[1]++;
              break;
            // Puedes agregar más roles según sea necesario
            default:
              // Tratar otros casos si es necesario
              break;
          }
        }
      });

      // Devolver el resultado
      return userData;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
}
