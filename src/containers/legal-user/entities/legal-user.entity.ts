import { ILegalUser } from "src/interfaces/legalUsers.interface";
import { Column, Entity } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'legal_users' })
export class LegalUserEntity extends BaseEntity implements ILegalUser {
  @Column()
  companyName: string;

  @Column()
  cuit: string;
};
