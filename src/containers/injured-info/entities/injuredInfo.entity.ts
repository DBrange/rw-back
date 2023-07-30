import { BaseEntity } from "../../../config/base.entity";
import { GENDER } from "../../../constants/enums";
import { Injured } from "../../../containers/injured/entities/injured.entity";
import { IInjuredInfo } from "../../../interfaces/injuredInfo.interface";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class InjuredInfo extends BaseEntity implements IInjuredInfo {

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

     @Column({type: "enum" , enum: GENDER })
     gender: GENDER;

     @Column()
     dni: string;

     @Column()
     injuries: string;
     
    @OneToOne(() => Injured )
    @JoinColumn()
    injured: Injured;
};