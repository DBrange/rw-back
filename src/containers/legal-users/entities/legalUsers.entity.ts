import { ROLES } from "src/constants/roles";
import { UserBrokerEntity } from "src/containers/user-broker/entities/user-broker.entity";
import { BaseEntity } from "../../../config/base.entity";
import { AssetEntity } from "../../../containers/asset/entities/asset.entity";
import { ILegalUser } from "../../../interfaces/legalUsers.interface";
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { UserEntity } from "src/containers/users/entities/user.entity";

@Entity({ name: 'legal_users' })
export class LegalUsers extends BaseEntity implements ILegalUser {
  @Column()
  companyName: string;

  @Column({ unique: true })
  cuit: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  altEmail: string;

  @Column()
  address: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToOne(() => UserBrokerEntity)
  @JoinColumn()
  broker: UserBrokerEntity;
  
  @ManyToOne(() => UserBrokerEntity, { nullable: true })
  @JoinColumn()
  userBroker: UserBrokerEntity;

  @OneToMany(() => AssetEntity, (asset) => asset.legalUsers)
  asset: AssetEntity[];
};
