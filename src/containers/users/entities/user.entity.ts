<<<<<<< HEAD
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { GENDER } from '../../../constants/enums';
import { ROLES } from '../../../constants/roles';
import { AssetEntity } from '../../../containers/asset/entities/asset.entity';
import { IUser } from '../../../interfaces/users.interface';
import { UserBrokerEntity } from 'src/containers/user-broker/entities/user-broker.entity';
=======
import { BaseEntity } from "../../../config/base.entity";
import { GENDER } from "../../../constants/enums";
import { IUser } from "../../../interfaces/users.interface";
import { Entity, Column, OneToMany } from "typeorm";
import { ROLES } from "../../../constants/roles"
import { Exclude } from 'class-transformer';
import { Client } from "src/containers/client/entities/client.entity";
import { BrokerRegister } from "src/containers/broker-register/entities/broker-register.entity";
//import { UsersAssetsEntity } from "./userAsset.entity";
import { AssetEntity } from "src/containers/asset/entities/asset.entity";
>>>>>>> 6e5a738fea9708e8e6308d9700ae7db071f9287f

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

<<<<<<< HEAD
  @ManyToOne(() => UserBrokerEntity, { nullable: true })
  userBroker: UserBrokerEntity;
  // @ManyToOne(() => UserBrokerEntity, (userBroker) => userBroker.clients)
  // userBroker: UserBrokerEntity
}
=======
     @OneToMany(() => Client, (client) => client.user)
     clients: Client[];
   
     @OneToMany(() => BrokerRegister, (brokerRegister) => brokerRegister.user)
     brokerRegisters: BrokerRegister[];
   
     @OneToMany(() => AssetEntity, (asset) => asset.users)
     asset: AssetEntity[];

};
>>>>>>> 6e5a738fea9708e8e6308d9700ae7db071f9287f
