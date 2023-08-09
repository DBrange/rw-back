import { BaseEntity } from "src/config/base.entity";
import { Vehicle } from "src/containers/vehicle/entities/vehicle.entity";
import { IGnc } from "src/interfaces/gnc.interface";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Gnc extends BaseEntity implements IGnc {

     @Column()
     expireDate: Date;

     @Column()
     oblea: string;

     @Column()
     plate: string;

     @OneToOne(() => Vehicle)
     @JoinColumn()
     vehicle: Vehicle;

};