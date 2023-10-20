import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { GENDER } from '../../../constants/enums';
import { ROLES } from '../../../constants/roles';
import { AssetEntity } from '../../../containers/asset/entities/asset.entity';
import { IUser } from '../../../interfaces/users.interface';
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

  @Column()
  email: string;

  @Column({ nullable: true })
  altEmail: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column()
  dni: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => AssetEntity, (asset) => asset.users)
  asset: AssetEntity[];

  @ManyToOne(() => UserBrokerEntity, { nullable: true })
  userBroker: UserBrokerEntity;
  // @ManyToOne(() => UserBrokerEntity, (userBroker) => userBroker.clients)
  // userBroker: UserBrokerEntity
}
