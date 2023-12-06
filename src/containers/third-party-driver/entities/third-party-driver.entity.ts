import { IThirdPartyDriver } from "src/interfaces/thirdPartyDriver.interface";
import { Entity, Column } from "typeorm";
import { BaseEntity } from 'src/config/base.entity';

@Entity({name: 'third_party_drivers'})
export class ThirdPartyDriverEntity extends BaseEntity implements IThirdPartyDriver {

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
};