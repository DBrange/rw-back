import { Module } from '@nestjs/common';
import { UserModule } from 'src/containers/user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule],
  exports: [],
})
export class AuthModule {}
