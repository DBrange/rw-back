
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";
import { GENDER } from "../../../constants/enums";
import { ACCESS_LEVEL, AUTHORIZATION, ROLES } from '../../../constants/roles';
import { IUser } from "../../../interfaces/users.interface";
//import { UsersAssetsEntity } from "./userAsset.entity";
import { AssetEntity } from "src/containers/asset/entities/asset.entity";
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  altEmail: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column({ unique: true })
  dni: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @Column({
    type: 'enum',
    enum: ACCESS_LEVEL,
    default: ACCESS_LEVEL.BASIC,
  })
  accessLevel: ACCESS_LEVEL;

  @Column({
    type: 'enum',
    enum: AUTHORIZATION,
    default: AUTHORIZATION.UNAUTHORIZED,
  })
  authorization: AUTHORIZATION;

  @OneToOne(() => UserBrokerEntity)
  @JoinColumn()
  broker: UserBrokerEntity;

  @ManyToOne(() => UserBrokerEntity, { nullable: true })
  @JoinColumn()
  userBroker: UserBrokerEntity;

  @OneToMany(() => AssetEntity, (asset) => asset.users)
  asset: AssetEntity[];
}
