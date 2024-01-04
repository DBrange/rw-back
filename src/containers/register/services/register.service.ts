import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { RegisterDTO } from '../dto/register.dto';
import { PersonalUserService } from 'src/containers/personal-user/services/personal-user.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { PersonalUserEntity } from 'src/containers/personal-user/entities/personal.user.entity';
import { LegalUserEntity } from 'src/containers/legal-user/entities/legal-user.entity';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { AUTHORIZATION, ROLES } from 'src/constants/roles';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from 'src/utils/error.manager';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly personalUserService: PersonalUserService,
    private readonly legalUserService: LegalUserService,
    private readonly userBrokerService: UserBrokerService,
  ) {}

  public async registerUser(body: RegisterDTO): Promise<UserEntity> {
    let personalUser: PersonalUserEntity;
    let legalUser: LegalUserEntity;
    let userBroker: UserBrokerEntity;

    if (body.personalUserDTO) {
      personalUser = await this.personalUserService.createPersonalUser(
        body.personalUserDTO,
      );
    } else if (body.legalUserDTO) {
      legalUser = await this.legalUserService.createLegalUser(
        body.legalUserDTO,
      );
    }

    if (body.userBrokerDTO) {
      userBroker = await this.userBrokerService.createUserBroker(
        body.userBrokerDTO,
      );
    }

    const userObj = {
      ...body.userDTO,
      personalUser,
      legalUser,
      userBroker,
      role: userBroker ? ROLES.BROKER : ROLES.CLIENT,
    };

    return await this.userService.createUser(userObj);
  }

  // Authentication
  public async getTemplate(email: string, token: string) {
    return `
    <head>
    <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
    
    <h3>Se creo una cuenta con tu mail: ${email}</h3>
    <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
    <a
        href="http://localhost:3001/v1/register/confirm/${token}"
        target="_blank"
    >Confirmar Cuenta</a>
</div>
`;
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
        from: `Verificacion de email <${configService.get('EMAIL_USER')}>`,
        to: email,
        subject: 'Verificacion',
        text: 'Verifique su mail.',
        html,
      };

      await transporter.sendMail(mailOptions);

      // delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    } catch (err) {
      throw ErrorManager.createSignaturError(err.message);
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

  public async createUserInLogin(body: RegisterDTO) {
    try {
      const { email, id } = await this.registerUser(body);

      const token = await this.getToken({ email, id });

      const template = await this.getTemplate(email, token);

      await this.sendEmailForValidateNewUser(email, template);

      // body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return { message: 'El usuario a sido creado con exito' };
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
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

  public async confirmEmail(token: string) {
    const data = await this.getTokenData(token);

    if (!data) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Problems with get token',
      });
    }

    const { email, id } = data.data;

    const user = await this.userService.findOneByEmail( email );

    if (!user === null) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Problems with get token',
      });
    }

    if (id !== user.id) {
      return false;
    }

    await this.userService.updateUser(user.id, {
      ...user,
      authorization: AUTHORIZATION.AUTHORIZED,
    });

    return true;
  }
}
