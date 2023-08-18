import { BaseEntity } from "../../../config/base.entity";
import { GENDER } from "../../../constants/enums";
import { Asset } from "../../../containers/asset/entities/asset.entity";
import { IUser } from "../../../interfaces/users.interface";
import { Entity, Column, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity implements IUser {

     @Column()
     name: string;

     @Column()
     lastName: string;

     @Column()
     birthDate: Date;

     @Column()
     phoneNumber: number;

     @Column()
     email: string;

     @Column({nullable: true})
     altEmail: string;

     @Column({type: "enum" , enum: GENDER})
     gender: GENDER;

     @Column()
     dni: string;

     @Column()
     address: string;

     @OneToMany(() => Asset, (asset) => asset.users)
     asset: Asset[];
};