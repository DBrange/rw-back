import { Electronics } from "src/containers/electronics/entities/electronics.entity";
import { BaseEntity } from "../../../config/base.entity";
import { ISmartphone } from "../../../interfaces/smartphone.interface";
import { Entity, Column, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Smartphone extends BaseEntity implements ISmartphone {

     @Column()
     imei: string;

     @Column()
     phoneNumber: string;

     @Column()
     phoneService: string;

     @OneToOne(() => Electronics)
     @JoinColumn()
     electronics: Electronics;
     
};
