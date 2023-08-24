import { BaseEntity } from "../../../config/base.entity";
import { FUEL, TYPE } from "../../../constants/enums";
// import { CarModel } from "../../../containers/car-models/entities/carModel.entity";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import { Entity, Column } from "typeorm";

@Entity({name: 'vehicle'})
export class Vehicle extends BaseEntity implements IVehicle {

     @Column()
     year: number;

     @Column()
     color: string;

     @Column()
     brand: string;

     @Column()
     model: string;
     
     @Column({nullable : true})
     tireBrand: string;

     @Column({nullable : true})
     tireSize: string;

     @Column({nullable : true})
     tireWear: number;

     @Column()
     damage: boolean;

     @Column({nullable : true})
     damageLocation: string;

     @Column({array: true})
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