import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../containers/users/users.module';
import { UsersService } from '../containers/users/users.service';
import { UserBrokerModule } from 'src/containers/user-broker/user-broker.module';
import { LegalUsersModule } from 'src/containers/legal-users/legal-users.module';
import { LegalUsersService } from 'src/containers/legal-users/legal-users.service';


@Global()
@Module({
  imports: [UsersModule, UserBrokerModule,LegalUsersModule],
  providers: [AuthService, UsersService, LegalUsersService],
  controllers: [AuthController]
})
export class AuthModule {}
