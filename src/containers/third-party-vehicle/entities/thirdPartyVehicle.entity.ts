import { BaseEntity } from "../../../config/base.entity";
import { Sinister } from "../../../containers/sinister/entities/sinister.entity";
import { IThirdPartyVehicle } from "../../../interfaces/thirdPartyVehicle.interface";
import { Entity, Column, ManyToOne } from "typeorm";

@Entity()
export class ThirdPartyVehicle extends BaseEntity implements IThirdPartyVehicle {

     @Column()
     brand: string;

     @Column()
     model: string;

     @Column()
     year: string;

     @Column()
     plate: string;

     @Column()
     insuranceCompany: string;

     @Column()
     insurancePolicy: string;

     @Column()
     ownerName: string;

     @Column()
     ownerLastName: string;

     @Column()
     ownerDni: string;

     @ManyToOne(() => Sinister , (sinister) => sinister.thirdPartyVehicle)
     sinister: Sinister;

};