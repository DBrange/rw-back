import { LegalUserDTO } from 'src/containers/legal-user/dto/legal-user.dto';
import { PersonalUserDTO } from 'src/containers/personal-user/dto/personal-user.dto';
import { UserBrokerDTO } from 'src/containers/user-broker/dto/user-broker.dto';
import { UserDTO } from 'src/containers/user/dto/user.dto';

export class RegisterDTO {
  userDTO: UserDTO;
  personalUserDTO?: PersonalUserDTO;
  legalUserDTO?: LegalUserDTO;
  userBrokerDTO?: UserBrokerDTO;
}
