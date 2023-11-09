import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../../containers/users/entities/user.entity';
import { UsersService } from '../../containers/users/users.service';
import { AuthResponse, PayloadToken } from '../interfaces/auth.interface';
import { LegalUsers } from 'src/containers/legal-users/entities/legalUsers.entity';
import { LegalUsersService } from 'src/containers/legal-users/legal-users.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly legalUserService: LegalUsersService,
  ) {}
  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | LegalUsers | null> {
    try {
      const userByEmail = await this.userService.findBy({
        key: 'email',
        value: email,
      });

      const legalUserByEmail = await this.legalUserService.findBy({
        key: 'email',
        value: email,
      });

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password);
        if (match) return userByEmail;
      } else if (legalUserByEmail) {
        const match = await bcrypt.compare(password, legalUserByEmail.password);
        if (match) return legalUserByEmail;
      }
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(
    user: UserEntity | LegalUsers,
  ): Promise<AuthResponse> {
    const users = await this.userService.getUsers();
    console.log(users)
    const findUser = users.find(el => el.id === user.id)

    let userToken;

    if (findUser) {
      
      userToken = await this.userService.getUsersById(user.id);
    } else {
      userToken = await this.legalUserService.getLegalUserById(user.id);
      
    }


      const date = new Date();
      const exp = Math.floor(date.getTime() / 1000) + 3600;

      const payload: PayloadToken = {
          role: userToken.role,
          sub: userToken.id,
        };


      return {
        accessToken: this.signJWT({
          payload,
          secret: process.env.JWT_SECRET,
          expires: '1h',
        }),
        user: userToken,
        exp,
      };

  }
}
