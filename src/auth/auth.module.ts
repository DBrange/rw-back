import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../containers/users/users.module';
import { UsersService } from '../containers/users/users.service';
import { UserBrokerModule } from 'src/containers/user-broker/user-broker.module';


@Global()
@Module({
  imports: [UsersModule, UserBrokerModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
