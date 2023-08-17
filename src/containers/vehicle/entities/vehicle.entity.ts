import { Gnc } from "src/containers/gnc/entities/gnc.entity";
import { BaseEntity } from "../../../config/base.entity";
import { FUEL, TYPE } from "../../../constants/enums";
// import { CarModel } from "../../../containers/car-models/entities/carModel.entity";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import { Entity, Column, OneToOne, JoinColumn, } from "typeorm";

@Entity()
export class Vehicle extends BaseEntity implements IVehicle {

     @Column()
     year: number;

     @Column()
     color: string;

     @Column()
     brand: string;

     @Column()
     model: string;

     
     @Column()
     tireBrand: string;

     @Column()
     tireSize: string;

     @Column()
     tireWear: number;

     @Column()
     damage: boolean;

     @Column()
     damageLocation: string;

     @Column()
     images: string;

     @Column()
     plate: string;

     @Column()
     gnc: boolean;

     @Column({type: "enum" , enum: FUEL })
     fuel: FUEL;

     @Column({type: "enum" , enum: TYPE })
     type: TYPE;

     @Column()
     okm: boolean;

};