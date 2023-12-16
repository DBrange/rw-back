import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { UserService } from 'src/containers/user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';
import {
  AuthResponse,
  PayloadToken,
  SingJWT,
} from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const userByEmail = await this.userService.findBy({
        key: 'email',
        value: email,
      });

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password);
        // console.log(userByEmail);
        if (match) return userByEmail;
      }
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public signJWT({ payload, secret, expires }: SingJWT): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserEntity): Promise<AuthResponse> {
    try {
      const userToken = await this.userService.getUserByIdForProfile(user.id);
      console.log('2');
      const date = new Date();
      const exp = Math.floor(date.getTime() / 1000) + 3600;
console.log('3');
      const payload: PayloadToken = {
        role: userToken.role,
        sub: userToken.id,
      };

      return {
        accessToken: this.signJWT({
          payload,
          secret: process.env.JWT_SECRET,
          expires: '5h',
        }),
        user: userToken,
        exp,
      };
    } catch (error) {
      console.log('4');
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
}
