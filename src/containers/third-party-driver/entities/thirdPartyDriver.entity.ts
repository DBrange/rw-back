import { BaseEntity } from "../../../config/base.entity";
import { ThirdPartyVehicle } from "../../../containers/third-party-vehicle/entities/thirdPartyVehicle.entity";
import { IThirdPartyDriver } from "../../../interfaces/thirdPartyDriver.interface";
import { Entity, Column, JoinColumn, OneToOne } from "typeorm";

@Entity({name: 'third_party_driver'})
export class ThirdPartyDriver extends BaseEntity implements IThirdPartyDriver {

     @Column({nullable: true})
     name: string;

     @Column({nullable: true})
     lastName: string;

     @Column({nullable: true})
     dni: string;

     @Column()
     address: string;

     @Column()
     phoneNumber: string;   

     @Column({ array: true})
     licensePhoto: string;

     @Column()
     email: string;
     
    //  @OneToOne(() => ThirdPartyVehicle)
    //  @JoinColumn()
    //  thirdPartyVehicle: ThirdPartyVehicle;
};