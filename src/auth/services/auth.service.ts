import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  public async validateUser(
    email: string,
    password: string,
  ): Promise<AuthResponse | null> {
    try {
      const userByEmail = await this.userService.findBy({
        key: 'email',
        value: email,
      });

      if (userByEmail) {
        const match = await bcrypt.compare(password, userByEmail.password);
        if (match) {
          const user = userByEmail;
          const jwt = await this.generateJWT(user.id);

          return jwt;
        } else {
          throw new UnauthorizedException('Data not valid');
        }
      }
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public signJWT({ payload, secret, expires }: SingJWT): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(userId: string): Promise<AuthResponse> {
    try {
      const userToken = await this.userService.getUserByIdForProfile(userId);

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
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async generateRefreshJWT(userId: string) {
    try {
      const userToken = await this.userService.getUserByIdForProfile(userId);

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
        exp,
      };
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async findUserGoogle(profile: Profile) {
    try {
      const findUser = await this.userService.findByGoogleEmail(
        profile.emails[0].value,
      );

      if (findUser) {
        const user = this.generateJWT(findUser.id);

        return user;
      } else return undefined;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public async getGoogleLoginData(userId: string) {
    try {
      const user = await this.generateJWT(userId);

      return user;
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }

  public googleLogin(req) {
    if (!req.user) {
      return 'no user google';
    }
    return { message: 'User into from google', user: req.user };
  }
}
