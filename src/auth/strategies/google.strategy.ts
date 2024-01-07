import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '177146090523-rjj82o7asv6vh8e176afm23p9on4noll.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/v1/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const user = await this.authService.findUserGoogle(profile);

      if (user) return done(null, user);
      else return {};
    } catch (error) {
      return done(error, null);
    }
  }
}
