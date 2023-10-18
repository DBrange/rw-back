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

@Entity({name: 'users'})
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

     @Column({nullable: true})
     altEmail: string;

     @Exclude()
     @Column()
     password: string;

     @Column({type: "enum" , enum: GENDER})
     gender: GENDER;

     @Column()
     dni: string;

     @Column()
     address: string;

     @Column({ type: 'enum', enum: ROLES })
     role: ROLES;

     @OneToMany(() => Client, (client) => client.user)
     clients: Client[];
   
     @OneToMany(() => BrokerRegister, (brokerRegister) => brokerRegister.user)
     brokerRegisters: BrokerRegister[];
   
     @OneToMany(() => AssetEntity, (asset) => asset.users)
     asset: AssetEntity[];

};
