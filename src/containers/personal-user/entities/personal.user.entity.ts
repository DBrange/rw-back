import { GENDER } from "src/constants/enums";
import { IPersonalUser } from "src/interfaces/personal-user.interface";
import { Entity, Column } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

 
@Entity({ name: 'personal_users' })
export class PersonalUserEntity extends BaseEntity implements IPersonalUser {
 
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column()
  dni: string;
}