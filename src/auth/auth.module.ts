import { Module } from '@nestjs/common';
import { UserModule } from 'src/containers/user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';

@Module({
  providers: [GoogleStrategy,AuthService],
  controllers: [AuthController],
  imports: [PassportModule.register({ defaultStrategy: 'google' }), UserModule],
  exports: [],
})
export class AuthModule {}
