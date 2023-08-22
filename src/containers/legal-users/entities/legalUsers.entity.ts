import { BaseEntity } from "../../../config/base.entity";
import { Asset } from "../../../containers/asset/entities/asset.entity";
import { ILegalUser } from "../../../interfaces/legalUsers.interface";
import { Entity, Column, OneToMany } from "typeorm";

@Entity({name: 'legal_users'})
export class LegalUsers extends BaseEntity implements ILegalUser {

     @Column()
     companyName: string;

     @Column()
     cuit: string;

     @Column()
     phoneNumber: string;

     @Column()
     email: string;

     @Column({nullable: true})
     altEmail: string;

     @Column()
     address: string;

     @OneToMany(() => Asset, (asset) => asset.legalUsers)
     asset: Asset[];
};