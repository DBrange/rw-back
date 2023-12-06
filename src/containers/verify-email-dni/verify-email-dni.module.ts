import { Module } from '@nestjs/common';
import { VerifyEmailDniService } from './services/verify-email-dni.service';
import { VerifyEmailDniController } from './controllers/verify-email-dni.controller';
import { UserEntity } from '../user/entities/user.entity';
import { UserBrokerEntity } from '../user-broker/entities/user-broker.entity';
import { PersonalUserEntity } from '../personal-user/entities/personal.user.entity';
import { LegalUserEntity } from '../legal-user/entities/legal-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { LegalUserService } from '../legal-user/services/legal-user.service';
import { PersonalUserService } from '../personal-user/services/personal-user.service';
import { UserBrokerService } from '../user-broker/services/user-broker.service';
import { UserService } from '../user/services/user.service';

@Module({
  providers: [
    VerifyEmailDniService,
    UserService,
    UserBrokerService,
    LegalUserService,
    PersonalUserService,
  ],
  controllers: [VerifyEmailDniController],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserBrokerEntity,
      PersonalUserEntity,
      LegalUserEntity,
    ]),
  ],
})
export class VerifyEmailDniModule {}
