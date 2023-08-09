import { BaseEntity } from "../../../config/base.entity";
import { Vehicle } from "../../../containers/vehicle/entities/vehicle.entity";
import { INewCarData } from "../../../interfaces/newCarData.interface";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class NewCarData extends BaseEntity implements INewCarData {

     @Column()
     noBearingCertificate: string[];

     @Column()
     purchaseCertificate: string[];

     @OneToOne(() => Vehicle)
     @JoinColumn()
     vehicle: Vehicle;
};