import { BaseEntity } from "../../../config/base.entity";
import { Vehicle } from "../../../containers/vehicle/entities/vehicle.entity";
import { IGnc } from "../../../interfaces/gnc.interface";
import { Column, Entity, OneToOne } from "typeorm";

@Entity({name: 'gnc'})
export class Gnc extends BaseEntity implements IGnc {

     @Column()
     expireDate: Date;

     @Column()
     oblea: string;

     @Column()
     plate: string;

     @OneToOne(() => Vehicle)
     vehicle: Vehicle;

};