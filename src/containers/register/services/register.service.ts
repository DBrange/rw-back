import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { RegisterDTO } from '../dto/register.dto';
import { PersonalUserService } from 'src/containers/personal-user/services/personal-user.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { PersonalUserEntity } from 'src/containers/personal-user/entities/personal.user.entity';
import { LegalUserEntity } from 'src/containers/legal-user/entities/legal-user.entity';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { UserEntity } from 'src/containers/user/entities/user.entity';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly personalUserService: PersonalUserService,
    private readonly legalUserService: LegalUserService,
    private readonly userBrokerService: UserBrokerService,
  ) {}

  public async registerUser(body: RegisterDTO): Promise<UserEntity> {
    let personalUser: PersonalUserEntity;
    let legalUser: LegalUserEntity;
    let userBroker: UserBrokerEntity;

    if (body.personalUserDTO) {
      personalUser = await this.personalUserService.createPersonalUser(
        body.personalUserDTO,
      );
    } else if (body.legalUserDTO) {
      legalUser = await this.legalUserService.createLegalUser(
        body.legalUserDTO,
      );
    }

    if (body.userBrokerDTO) {
      userBroker = await this.userBrokerService.createUserBroker(
        body.userBrokerDTO,
      );
    }

    const userObj = {
      ...body.userDTO,
      personalUser,
      legalUser,
      userBroker,
      role: userBroker ? ROLES.BROKER : ROLES.CLIENT
    };

    return await this.userService.createUser(userObj);
  }
}
