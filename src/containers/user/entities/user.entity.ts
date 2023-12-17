import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ACCESS_LEVEL, AUTHORIZATION, ROLES } from '../../../constants/roles';
import { IUser } from '../../../interfaces/users.interface';
//import { UsersAssetsEntity } from "./userAsset.entity";
import { AssetEntity } from 'src/containers/asset/entities/asset.entity';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
import { LegalUserEntity } from 'src/containers/legal-user/entities/legal-user.entity';
import { PersonalUserEntity } from 'src/containers/personal-user/entities/personal.user.entity';
import { BaseEntity } from 'src/config/base.entity';
import { NotificationEntity } from 'src/containers/notification/entities/notification.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  altEmail: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  address: string;

  @Column({nullable: true, default: null})
  lastRecord: Date;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @Column({
    type: 'enum',
    enum: ACCESS_LEVEL,
    default: ACCESS_LEVEL.BASIC,
  })
  accessLevel: ACCESS_LEVEL;

  @OneToOne(() => LegalUserEntity)
  @JoinColumn()
  legalUser: LegalUserEntity;

  @OneToOne(() => PersonalUserEntity)
  @JoinColumn()
  personalUser: PersonalUserEntity;

  @Column({
    type: 'enum',
    enum: AUTHORIZATION,
    default: AUTHORIZATION.UNAUTHORIZED,
  })
  authorization: AUTHORIZATION;

  @ManyToOne(() => UserBrokerEntity, (userBroker) => userBroker.clients, {
    nullable: true,
  })
  @JoinColumn()
  broker: string;

  @OneToOne(() => UserBrokerEntity)
  @JoinColumn()
  userBroker: string;

  @OneToMany(() => AssetEntity, (asset) => asset.client)
  brokerAssets: string[];

  @OneToMany(() => AssetEntity, (asset) => asset.user)
  assets: string[];

  @OneToMany(() => NotificationEntity, (notification) => notification.sender)
  sentNotifications: string[];

  @OneToMany(() => NotificationEntity, (notification) => notification.receiver)
  receivedNotifications: string[];
}
