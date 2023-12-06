import { Module } from '@nestjs/common';
import { RegisterService } from './services/register.service';
import { RegisterController } from './controllers/register.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserEntity } from '../user/entities/user.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { LegalUserEntity } from '../legal-user/entities/legal-user.entity';
import { PersonalUserEntity } from '../personal-user/entities/personal.user.entity';
import { LegalUserService } from '../legal-user/services/legal-user.service';
import { PersonalUserService } from '../personal-user/services/personal-user.service';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserService } from '../user/services/user.service';

@Module({
  providers: [
    RegisterService,
    UserService,
    UserBrokerService,
    LegalUserService,
    PersonalUserService,
  ],
  controllers: [RegisterController],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserBrokerEntity,
      LegalUserEntity,
      PersonalUserEntity,
    ]),
  ],
})
export class RegisterModule {}
