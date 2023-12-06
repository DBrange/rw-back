import { LegalUserDTO } from "src/containers/legal-user/dto/legal-user.dto";
import { UserBrokerDTO } from "src/containers/user-broker/dto/user-broker.dto";
import { UserDTO } from "./user.dto";
import { PersonalUserDTO } from "src/containers/personal-user/dto/personal-user.dto";

export class UserUserBrokerDTO{
  userDTO?: UserDTO;
  personalUserDTO?: PersonalUserDTO
  legalUserDTO?: LegalUserDTO;
  userBrokerDTO?: UserBrokerDTO
}