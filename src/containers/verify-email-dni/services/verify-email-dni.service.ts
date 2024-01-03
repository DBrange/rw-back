import { Injectable } from '@nestjs/common';
import { LegalUserService } from 'src/containers/legal-user/services/legal-user.service';
import { PersonalUserService } from 'src/containers/personal-user/services/personal-user.service';
import { UserBrokerService } from 'src/containers/user-broker/services/user-broker.service';
import { UserService } from 'src/containers/user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class VerifyEmailDniService {
  constructor(
    private readonly userService: UserService,
    private readonly userBrokerService: UserBrokerService,
    private readonly legalUserService: LegalUserService,
    private readonly personalUserService: PersonalUserService,
  ) {}

  public async verifyEmailDni(
    email: string | undefined,
    dniOrCuit: string | undefined,
    enrollment: string | undefined,
  ) {
    try {
      if (enrollment) {
        const verifyEnrollment = await this.userBrokerService.verifyEnrollment(
          enrollment,
        );
        if (verifyEnrollment) return true;
      }
      let emaill: boolean;
      let dni: boolean;
      let cuit: boolean;
console.log(dniOrCuit);
      if (email) emaill = await this.userService.verifyEmail(email);

      if (dniOrCuit) dni = await this.personalUserService.verifyDni(dniOrCuit);
      
      if (dniOrCuit) cuit = await this.legalUserService.verifyCuit(dniOrCuit);

      if (emaill || dni || cuit) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }
}
