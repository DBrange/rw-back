import * as jwt from 'jsonwebtoken';
import { ROLES } from 'src/constants/roles';
import { UserEntity } from 'src/containers/user/entities/user.entity';

export interface AuthBody {
  email: string;
  password: string;
}

export interface SingJWT {
  payload: jwt.JwtPayload;
  secret: string;
  expires: number | string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserEntity;
  exp: number;
}

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}