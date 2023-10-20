import { UserBrokerDTO } from "src/containers/user-broker/dto/user-broker.dto";
import { UserDTO } from "./user.dto";
import { LegalUsersDTO } from "src/containers/legal-users/dto/legalUsers.dto";

export class UserUserBrokerDTO{
  userDTO: UserDTO;
  legalUserDTO: LegalUsersDTO;
  userBrokerDTO: UserBrokerDTO
}